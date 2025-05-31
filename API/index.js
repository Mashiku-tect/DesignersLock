
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
require('dotenv').config();


const sequelize = require('./config/database');
const User = require('./models/Users');         // Example model
const Product = require('./models/Product');   // Example model
const Payment = require('./models/Payment'); 
const Message = require('./models/Message');  // Your payment model
//const Order = require('./models/Order');       // Your order model


//routes Imports
const RegisterRoute = require('./routes/registerRoutes');
const loginRoute=require('./routes/loginRoutes');
const orderRoute=require('./routes/orderRoutes');
const searchRoutes=require('./routes/searchRoutes');
const paymentRoute=require('./routes/paymentRoutes');
const checkPaymentRoute=require('./routes/checkPaymentRoutes');

User.hasMany(Product, { foreignKey: 'user_id' });
User.hasMany(Payment, { foreignKey: 'user_id' });

Product.belongsTo(User, { foreignKey: 'user_id' });
Product.hasMany(Payment, { foreignKey: 'product_id' });

Payment.belongsTo(User, { foreignKey: 'user_id' });
Payment.belongsTo(Product, { foreignKey: 'product_id' });



const app = express();
const server = http.createServer(app); 
app.use('/uploads', express.static('uploads')); // Serve image paths
app.use(bodyParser.json());
app.use('/api', RegisterRoute);
app.use('/api',loginRoute);
app.use('/api', orderRoute);
app.use('/api', searchRoutes);
app.use('/api', paymentRoute);
app.use('/api', checkPaymentRoute);

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  console.log("✅ MySQL tables synced");
  server.listen(PORT, () => { // 🔁 Step 3: use server.listen
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
