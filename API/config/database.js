const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize('designerlock', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false // Set to true if you want to see SQL queries in the console
});

module.exports = sequelize;
