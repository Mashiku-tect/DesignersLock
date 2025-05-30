const sequelize = require('./config/database');
const User = require('./models/Users');         // Example model
const Product = require('./models/Product');   // Example model
const Payment = require('./models/Payment');   // Your payment model
//const Order = require('./models/Order');       // Your order model

// Define relationships here if needed
// Example: Payment.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Product, { foreignKey: 'user_id' });
User.hasMany(Payment, { foreignKey: 'user_id' });

Product.belongsTo(User, { foreignKey: 'user_id' });
Product.hasMany(Payment, { foreignKey: 'product_id' });

Payment.belongsTo(User, { foreignKey: 'user_id' });
Payment.belongsTo(Product, { foreignKey: 'product_id' });

async function startApp() {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');

    // Auto sync all models
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
    console.log('✅ All models were synchronized successfully.');

    // Start your server or logic here
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

startApp();
