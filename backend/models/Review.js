const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  authorName: { type: String, required: true },
  authorInitials: { type: String, default: 'CL' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  content: { type: String, required: true },
  verifiedPurchase: { type: Boolean, default: true },
  sizePurchased: { type: String, default: 'S' },
  fitSpecs: { type: String, default: '5\'8", 132 lbs' },
  fitFeedback: { type: String, enum: ['Runs Small', 'True to Size', 'Runs Large'], default: 'True to Size' },
  helpfulVotes: { type: Number, default: 12 },
  occasion: { type: String, default: 'Evening Gala' }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);

