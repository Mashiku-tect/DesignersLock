const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // adjust the path as needed

const Product = sequelize.define('Order', {
  product_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  productname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  productimagepath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  clientname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  clientphonenumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  designtitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  additionalnotes: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue:"In Progress"
  }

}, {
  tableName: 'products', // Replace this with your actual table name
  timestamps: true // set to false if you're not using createdAt / updatedAt
});

Product.associate = function(models) {
Product.belongsTo(models.Users, { foreignKey: 'user_id' });
Product.hasMany(models.Payment, { foreignKey: 'product_id' });

}

module.exports = Product;
