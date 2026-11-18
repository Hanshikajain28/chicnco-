const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { fallbackProducts } = require('../utils/fallbackData');

const getCartIdentifier = (req) => {
  if (req.user) return { user: req.user._id };
  const sessionId = req.headers['x-session-id'] || 'guest-session-atelier';
  return { sessionId };
};

exports.getCart = async (req, res, next) => {
  try {
    const filter = getCartIdentifier(req);
    let cart = null;
    try {
      cart = await Cart.findOne(filter).populate('items.product');
    } catch (e) {
      // DB offline fallback
    }

    if (!cart) {
      return res.json({
        success: true,
        cart: {
          items: [],
          promoCode: '',
          discountPercent: 0,
          giftPackaging: false
        }
      });
    }

    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, color, colorHex, size, quantity = 1 } = req.body;
    
    // Find product details
    let product = null;
    try {
      product = await Product.findById(productId);
    } catch (e) {}

    if (!product) {
      product = fallbackProducts.find(p => p._id === productId || p.slug === productId);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Garment not found' });
    }

    const price = product.salePrice || product.price;
    const filter = getCartIdentifier(req);

    let cart = null;
    try {
      cart = await Cart.findOne(filter);
      if (!cart) {
        cart = new Cart(filter);
      }

      const existingIndex = cart.items.findIndex(
        i => (i.product?.toString() === product._id.toString() || i.name === product.name) &&
             i.color === color &&
             i.size === size
      );

      if (existingIndex > -1) {
        cart.items[existingIndex].quantity += Number(quantity);
      } else {
        cart.items.push({
          product: product._id,
          name: product.name,
          image: product.images[0]?.url || '',
          color: color || product.colors[0]?.name || 'Standard',
          colorHex: colorHex || product.colors[0]?.hex || '#000000',
          size: size || 'S',
          quantity: Number(quantity),
          price: product.price,
          salePrice: product.salePrice
        });
      }

      await cart.save();
    } catch (dbErr) {
      // In-memory response if DB is unreachable
      return res.json({
        success: true,
        cart: {
          items: [{
            product: product._id,
            name: product.name,
            image: product.images[0]?.url || '',
            color: color || 'Default',
            colorHex: colorHex || '#000000',
            size: size || 'S',
            quantity: Number(quantity),
            price: product.price,
            salePrice: product.salePrice
          }],
          promoCode: '',
          discountPercent: 0
        }
      });
    }

    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const filter = getCartIdentifier(req);
    const cart = await Cart.findOne(filter);

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Shopping bag not found' });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in shopping bag' });
    }

    if (quantity <= 0) {
      cart.items.pull(req.params.itemId);
    } else {
      item.quantity = Number(quantity);
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const filter = getCartIdentifier(req);
    const cart = await Cart.findOne(filter);

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Shopping bag not found' });
    }

    cart.items.pull(req.params.itemId);
    await cart.save();

    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

exports.applyPromoCode = async (req, res, next) => {
  try {
    const { code } = req.body;
    const cleanCode = (code || '').trim().toUpperCase();

    const PROMO_CODES = {
      'CHIC15': 15,
      'ATELIER20': 20,
      'FIRST10': 10
    };

    if (!PROMO_CODES[cleanCode]) {
      return res.status(400).json({ success: false, message: 'Voucher code is invalid or expired. Try CHIC15 for 15% off.' });
    }

    const filter = getCartIdentifier(req);
    let cart = null;
    try {
      cart = await Cart.findOne(filter);
      if (cart) {
        cart.promoCode = cleanCode;
        cart.discountPercent = PROMO_CODES[cleanCode];
        await cart.save();
      }
    } catch (e) {}

    res.json({
      success: true,
      message: `Voucher ${cleanCode} successfully applied! ${PROMO_CODES[cleanCode]}% discount granted.`,
      promoCode: cleanCode,
      discountPercent: PROMO_CODES[cleanCode],
      cart
    });
  } catch (error) {
    next(error);
  }
};

