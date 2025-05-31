// routes/orderRoutes.js
const express = require('express');
const { upload, createOrder } = require('../controllers/orderController');
const verifyToken =  require('../middleware/middleware'); 

const router = express.Router();

router.post('/orders',verifyToken, upload.array('files'), createOrder);

module.exports = router;
