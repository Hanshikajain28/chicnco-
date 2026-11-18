const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, getMyOrders } = require('../controllers/orderController');
const { protect, optionalAuth } = require('../middleware/auth');

router.post('/', optionalAuth, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', optionalAuth, getOrderById);

module.exports = router;

