const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart, applyPromoCode } = require('../controllers/cartController');
const { optionalAuth } = require('../middleware/auth');

router.use(optionalAuth);
router.get('/', getCart);
router.post('/', addToCart);
router.put('/:itemId', updateCartItem);
router.delete('/:itemId', removeFromCart);
router.post('/promo', applyPromoCode);

module.exports = router;

