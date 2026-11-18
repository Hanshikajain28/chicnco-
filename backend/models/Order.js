const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  guestEmail: { type: String, default: '' },
  orderNumber: { type: String, unique: true, index: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String, required: true },
    image: { type: String, default: '' },
    color: { type: String, default: '' },
    size: { type: String, default: '' },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
  }],
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String, required: true },
    apt: { type: String, default: '' },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'United States' },
    phone: { type: String, default: '' }
  },
  shippingMethod: { type: String, enum: ['standard', 'whiteglove'], default: 'standard' },
  shippingCost: { type: Number, default: 0 },
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  promoCode: { type: String, default: '' },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['card', 'klarna', 'apple_pay', 'paypal'], default: 'card' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'paid' },
  orderStatus: { type: String, enum: ['processing', 'confirmed', 'dispatched', 'delivered'], default: 'processing' },
  giftPackaging: { type: Boolean, default: false },
  giftMessage: { type: String, default: '' }
}, { timestamps: true });

orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = `CNC-${Math.floor(10000 + Math.random() * 90000)}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);

