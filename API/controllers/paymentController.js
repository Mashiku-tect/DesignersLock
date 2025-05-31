// controllers/paymentController.js
const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  const {  productId, amount } = req.body;
   const userId = req.user_id;

  try {
    await Payment.create({
      user_id: userId,
      product_id: productId,
      amountpaid: amount,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Payment save failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
