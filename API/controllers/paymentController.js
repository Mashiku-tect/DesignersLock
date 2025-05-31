// controllers/paymentController.js
const Payment = require('../models/Payment');
const Product = require('../models/Product');

exports.createPayment = async (req, res) => {
  const { productId, amount } = req.body;
  const userId = req.user_id;

  try {
    // Create a payment record
    await Payment.create({
      user_id: userId,
      product_id: productId,
      amountpaid: amount,
    });

    // Update product status to 'Completed'
    await Product.update(
      { status: 'Completed' },
      {
        where: {
          product_id: productId,
          user_id: userId,
        },
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Payment save failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
