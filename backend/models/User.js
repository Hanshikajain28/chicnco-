const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6, select: false },
  phone: { type: String, trim: true, default: '' },
  avatar: { type: String, default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzQFxsQtOc2mCcTTVCu54CQxQzEkM482GSE3FhqsZrnI7hyXb7XSLQEqYILyCicTATJlRKQtM3A1or3FM3pu6nFoxmNun1nkj1lj2lRMRYgybgVubDDjVTv0fgFaHIIB4djj077_o_1m16s-an2Ywiy-DVwaQqS1P3IhteOOG1RsPOeVv6jKQAkVqWcmAR7HH1fksKiZ77tNFKUsd9Ad0EZOcZ2eR8nIMRYZ3ey2oCnaihs85cpzSRCA' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  addresses: [{
    label: { type: String, default: 'Primary Atelier Residence' },
    firstName: String,
    lastName: String,
    street: String,
    apt: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'US' },
    isDefault: { type: Boolean, default: false }
  }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  newsletterOptIn: { type: Boolean, default: true }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

