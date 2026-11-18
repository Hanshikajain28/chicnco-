const express = require('express');
const router = express.Router();
const { getProductReviews, createReview } = require('../controllers/reviewController');
const { optionalAuth } = require('../middleware/auth');

router.get('/product/:productId', getProductReviews);
router.post('/', optionalAuth, createReview);

module.exports = router;

