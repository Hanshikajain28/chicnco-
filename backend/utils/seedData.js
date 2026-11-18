const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const { fallbackProducts } = require('./fallbackData');

dotenv.config();

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('[Seed Error] MONGODB_URI not found in environment.');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('[Seed] MongoDB Connected successfully.');

    await Product.deleteMany({});
    console.log('[Seed] Cleared existing products.');

    const formattedProducts = fallbackProducts.map(p => {
      const item = { ...p };
      delete item._id; // Let Mongo generate IDs or keep as needed
      return item;
    });

    const inserted = await Product.insertMany(formattedProducts);
    console.log(`[Seed] Successfully seeded ${inserted.length} Chic N Co. couture pieces.`);

    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err.message);
    process.exit(1);
  }
};

seedDB();

