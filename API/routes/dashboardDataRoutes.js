
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardDataController');
const authenticate = require('../middleware/middleware');

// GET /api/dashboard/:userId
router.get('/dashboard',authenticate, dashboardController.getDashboard);

module.exports = router;
