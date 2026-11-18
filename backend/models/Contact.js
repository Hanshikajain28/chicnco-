const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  orderNumber: { type: String, default: '' },
  inquiryType: {
    type: String,
    enum: ['sizing', 'shipping', 'returns', 'press', 'other'],
    required: true
  },
  message: { type: String, required: true },
  newsletterOptIn: { type: Boolean, default: false },
  status: { type: String, enum: ['new', 'in_progress', 'resolved'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);

