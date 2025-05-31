// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/checkPaymentController');
const authenticate = require('../middleware/middleware'); // Middleware to authenticate user

router.post('/checkpayment', authenticate, paymentController.checkPayment);

module.exports = router;
