// controllers/paymentController.js
const  Payment  = require('../models/Payment');

exports.checkPayment = async (req, res) => {
  const { productId } = req.body;
  //console.log("product id is "+productId)
 
  const userId = req.user_id; // Assuming user ID is available in the request
  // console.log("user id is "+userId)

  try {
    const payment = await Payment.findOne({
      where: {
        user_id: userId,
        product_id: productId,
        
      },
    });

    if (payment) {
      return res.json({ hasPaid: true });
    } else {
      return res.json({ hasPaid: false });
    }
  } catch (error) {
    console.error('Error checking payment:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
