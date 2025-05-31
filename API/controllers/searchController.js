const Product = require('../models/Product');
const { Op } = require('sequelize');

exports.searchProducts = async (req, res) => {
  const query = req.query.q || '';

  try {
    const results = await Product.findAll({
      where: {
        [Op.or]: [
          { product_id: { [Op.like]: `%${query}%` } },
         
        ]
      }
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
