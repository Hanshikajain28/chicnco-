const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  sessionId: { type: String, default: '' },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    image: String,
    color: String,
    colorHex: String,
    size: String,
    quantity: { type: Number, default: 1, min: 1 },
    price: Number,
    salePrice: Number
  }],
  promoCode: { type: String, default: '' },
  discountPercent: { type: Number, default: 0 },
  giftPackaging: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);

