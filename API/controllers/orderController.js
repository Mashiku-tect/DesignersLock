// controllers/orderController.js
const multer = require('multer');
const path = require('path');
const slugify = require('slugify');
const fs = require('fs');
const Order = require('../models/Product');
const { v4: uuidv4 } = require('uuid');

// Setup multer storage with unique file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// Generate a simple, human-friendly product ID
const generateSimpleProductId = (title) => {
  const slug = slugify(title, { lower: true, strict: true });
  const random = Math.floor(100 + Math.random() * 900); // random 3-digit number
  return `${slug}-${random}`;
};

// Try generating a new key indefinitely until unique
const createUniqueProductId = async (title) => {
  let newId;
  let exists = true;

  while (exists) {
    newId = generateSimpleProductId(title);
    const existing = await Order.findOne({ where: { product_id: newId } });
    exists = existing !== null;
  }

  return newId;
};


const createOrder = async (req, res) => {
   const userId = req.user_id;
   console.log("user Id is"+userId)
  try {
    const { clientname, clientphonenumber, designtitle, price, additionalnotes } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'At least one file is required' });
    }

    const filePaths = files.map(file => file.path);

    // Generate unique product_id (loops until unique)
    const simpleProductId = await createUniqueProductId(designtitle);

    const order = await Order.create({
      clientname,
      clientphonenumber,
      designtitle,
      price,
      productname: designtitle,
      additionalnotes,
      productimagepath: filePaths[0], // store the first image path
      product_id: simpleProductId,
      user_id:userId
    });

    res.status(201).json({
      message: 'Order created successfully',
      productId: order.product_id,
      imagePath: order.productimagepath,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

module.exports = { upload, createOrder };
