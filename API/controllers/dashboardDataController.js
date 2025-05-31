const User= require('../models/Users');
const Product=require('../models/Product');
const { Op } = require('sequelize');
const moment = require('moment');

exports.getDashboard = async (req, res) => {
  try {
     const userId = req.user_id;

    // Fetch user
    const user = await User.findByPk(userId);

    // Fetch active orders count
    const activeOrdersCount = await Product.count({
      where: { user_id: userId, status: 'In Progress' }
    });

    // Fetch monthly revenue
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();

    const monthlyRevenueData = await Product.findAll({
      where: {
        user_id: userId,
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth]
        }
      }
    });

    const monthlyRevenue = monthlyRevenueData.reduce((sum, p) => sum + p.price, 0);

    // Fetch all orders (Active, In Progress, Completed)
    const allOrders = await Product.findAll({
      where: {
        user_id: userId,
        status: {
          [Op.in]: ['Active', 'In Progress', 'Completed']
        }
      },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      name: user.firstname,
      activeOrders: activeOrdersCount,
      monthlyRevenue,
      orders: allOrders,
      
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
