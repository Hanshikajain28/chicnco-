const Product = require('../models/Product');
const { fallbackProducts } = require('../utils/fallbackData');

exports.getProducts = async (req, res, next) => {
  try {
    const { category, size, color, minPrice, maxPrice, rating, occasion, sort, search, page = 1, limit = 48 } = req.query;

    let query = { isActive: true };

    if (category && category !== 'All Styles' && category !== 'all') {
      query.category = new RegExp(`^${category}$`, 'i');
    }

    if (size) {
      query['sizes.size'] = size.toUpperCase();
    }

    if (color) {
      query['colors.name'] = new RegExp(color, 'i');
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    if (occasion) {
      query.occasion = new RegExp(occasion, 'i');
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { category: new RegExp(search, 'i') },
        { tags: new RegExp(search, 'i') }
      ];
    }

    let sortOptions = { isFeatured: -1, createdAt: -1 };
    if (sort === 'price_asc') sortOptions = { price: 1 };
    else if (sort === 'price_desc') sortOptions = { price: -1 };
    else if (sort === 'rating') sortOptions = { rating: -1 };
    else if (sort === 'newest') sortOptions = { createdAt: -1 };

    let products = [];
    let total = 0;

    try {
      const skip = (Number(page) - 1) * Number(limit);
      total = await Product.countDocuments(query);
      products = await Product.find(query).sort(sortOptions).skip(skip).limit(Number(limit));
    } catch (dbErr) {
      console.warn('[Products] DB query failed, falling back to local dataset:', dbErr.message);
    }

    // Fallback if database is empty or disconnected
    if (!products || products.length === 0) {
      let filtered = [...fallbackProducts];
      if (category && category !== 'All Styles' && category !== 'all') {
        filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
      if (size) {
        filtered = filtered.filter(p => p.sizes.some(s => s.size.toLowerCase() === size.toLowerCase()));
      }
      if (color) {
        filtered = filtered.filter(p => p.colors.some(c => c.name.toLowerCase().includes(color.toLowerCase())));
      }
      if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
      if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));
      if (rating) filtered = filtered.filter(p => p.rating >= Number(rating));
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }

      total = filtered.length;
      products = filtered;
    }

    res.json({
      success: true,
      count: products.length,
      total,
      products
    });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    let product = null;
    try {
      product = await Product.findById(req.params.id);
      if (!product) {
        product = await Product.findOne({ slug: req.params.id });
      }
    } catch (e) {
      // not a valid ObjectId or DB not ready
    }

    if (!product) {
      product = fallbackProducts.find(p => p._id === req.params.id || p.slug === req.params.id);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found in Atelier catalog' });
    }

    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

