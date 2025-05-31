// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { createPayment } = require('../controllers/paymentController');
const verifyToken =  require('../middleware/middleware'); 

router.post('/pay', verifyToken,createPayment);

module.exports = router;
