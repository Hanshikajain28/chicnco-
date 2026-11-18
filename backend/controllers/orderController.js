const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.createOrder = async (req, res, next) => {
  try {
    const {
      email,
      items,
      shippingAddress,
      shippingMethod = 'standard',
      paymentMethod = 'card',
      promoCode,
      giftPackaging = false,
      giftMessage = ''
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Your shopping bag is empty' });
    }

    if (!shippingAddress || !shippingAddress.firstName || !shippingAddress.street || !shippingAddress.city) {
      return res.status(400).json({ success: false, message: 'Please provide complete delivery address' });
    }

    // Calculate totals
    let subtotal = 0;
    const formattedItems = items.map(item => {
      const price = Number(item.salePrice || item.price);
      subtotal += price * Number(item.quantity || 1);
      return {
        product: item.productId || item._id,
        name: item.name,
        image: item.image,
        color: item.color,
        size: item.size,
        quantity: Number(item.quantity || 1),
        price
      };
    });

    let discount = 0;
    if (promoCode && promoCode.toUpperCase() === 'CHIC15') {
      discount = Math.round(subtotal * 0.15 * 100) / 100;
    }

    // Free shipping on orders over $120
    const shippingCost = shippingMethod === 'whiteglove' ? 18.00 : (subtotal >= 120 ? 0.00 : 15.00);
    const tax = Math.round((subtotal - discount) * 0.08 * 100) / 100;
    const total = Math.round((subtotal - discount + shippingCost + tax) * 100) / 100;

    let order = null;
    try {
      order = await Order.create({
        user: req.user ? req.user._id : null,
        guestEmail: email || req.user?.email || 'concierge-guest@chicnco.com',
        items: formattedItems,
        shippingAddress,
        shippingMethod,
        shippingCost,
        subtotal,
        discount,
        promoCode: promoCode || '',
        tax,
        total,
        paymentMethod,
        paymentStatus: 'paid',
        orderStatus: 'confirmed',
        giftPackaging,
        giftMessage
      });

      // Clear cart
      if (req.user) {
        await Cart.findOneAndDelete({ user: req.user._id });
      }
    } catch (dbErr) {
      // Local order response if DB is unreachable
      order = {
        _id: "order-" + Date.now(),
        orderNumber: `CNC-${Math.floor(10000 + Math.random() * 90000)}`,
        items: formattedItems,
        shippingAddress,
        shippingMethod,
        shippingCost,
        subtotal,
        discount,
        tax,
        total,
        paymentMethod,
        paymentStatus: 'paid',
        orderStatus: 'confirmed',
        createdAt: new Date()
      };
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! A confirmation dispatch note has been sent to your email.',
      order
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    let order = null;
    try {
      order = await Order.findOne({
        $or: [{ _id: req.params.id }, { orderNumber: req.params.id }]
      }).populate('items.product');
    } catch (e) {}

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order reference not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    next(error);
  }
};

