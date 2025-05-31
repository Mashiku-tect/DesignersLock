const User = require('../models/Users');
const bcrypt = require('bcrypt'); // Make sure to install it: npm install bcrypt

exports.registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, phonenumber, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // 2. Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Create new user
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      phonenumber,
      password: hashedPassword
    });

    // 4. Respond
    res.status(201).json({ message: 'Registered successfully', user: newUser });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};
