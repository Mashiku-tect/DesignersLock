const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profileimage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phonenumber: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  instagram: {
    type: DataTypes.STRING,
    allowNull: true
  },
  x: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true
  },
  posts: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: false,
  tableName: 'users'
});


Users.associate = function(models) {
User.hasMany(models.Product, { foreignKey: 'user_id' });
User.hasMany(models.Payment, { foreignKey: 'user_id' });
}



module.exports = Users;
