const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, index: true },
  sku: { type: String, default: '' },
  description: { type: String, required: true },
  shortDescription: { type: String, default: '' },
  category: {
    type: String,
    required: true,
    enum: ['Dresses', 'Tops & Blouses', 'Bottoms', 'Co-ords', 'Plus Size Atelier', 'Outerwear', 'Accessories']
  },
  subcategory: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  salePrice: { type: Number, default: null },
  onSale: { type: Boolean, default: false },
  badge: { type: String, default: null },
  images: [{
    url: { type: String, required: true },
    alt: { type: String, default: '' }
  }],
  colors: [{
    name: { type: String, required: true },
    hex: { type: String, required: true },
    image: { type: String, default: '' }
  }],
  sizes: [{
    size: { type: String, required: true },
    stock: { type: Number, default: 5 }
  }],
  material: { type: String, default: 'Pure Mulberry Silk & Eco-Vero Viscose' },
  fabricComposition: { type: String, default: '70% Certified Eco-Vero™ Viscose, 30% Grade-6A Mulberry Silk' },
  careInstructions: { type: String, default: 'Dry clean gently or delicate cold hand-wash with silk-safe detergent.' },
  sustainability: { type: String, default: 'Certified Standard 100 by OEKO-TEX®' },
  occasion: [{ type: String }],
  rating: { type: Number, default: 4.9, min: 0, max: 5 },
  reviewCount: { type: Number, default: 120 },
  tags: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

productSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  if (!this.sku) {
    this.sku = `CH-${Math.floor(1000 + Math.random() * 9000)}-${this.category.substring(0, 2).toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);

