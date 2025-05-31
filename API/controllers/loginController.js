const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret key for signing JWT (use env vars in production)
//const JWT_SECRET = 'kjdkkdjfdllsklKLKLFCDKLJKXJCDIJKJCLXJCKJNXDFKJCKJD4578398393KJNJKXCHJHSDFKJCXMNXCNB';

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    // Generate token (expires in 1 day)
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email }, // payload
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // expires in 1 day
    );


    //console.log("token is "+token)
    res.status(200).json({
      message: 'Login successful',
      token,        // 👈 Send token to frontend
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        // add other user fields as needed
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
