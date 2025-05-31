const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // adjust the path as needed

const Payment = sequelize.define('Payment', {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amountpaid: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'payments', // replace if your table name is different
  timestamps: false // change to false if you're not using createdAt/updatedAt
});

Payment.associate = function(models) {
Payment.belongsTo(models.Users, { foreignKey: 'user_id' });
Payment.belongsTo(models.Product, { foreignKey: 'product_id' });
}

module.exports = Payment;
