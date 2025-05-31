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
    defaultValue:null

  },
  phonenumber: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  website: {
    type: DataTypes.STRING,
     defaultValue:"user.com",
  },
  instagram: {
    type: DataTypes.STRING,
    defaultValue:"@user",
  },
  x: {
    type: DataTypes.STRING,
    defaultValue:"@user",
  },
  bio: {
    type: DataTypes.STRING,
    defaultValue:"Digital esigner",
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
Users.hasMany(models.Product, { foreignKey: 'user_id' });
Users.hasMany(models.Payment, { foreignKey: 'user_id' });
Message.belongsTo(models.Users, {
  as: 'Sender',
  foreignKey: 'sender_id',
  targetKey: 'user_id'  // points to the primary key in User table
});

Message.belongsTo(models.Users, {
  as: 'Receiver',
  foreignKey: 'receiver_id',
  targetKey: 'user_id'
});

}



module.exports = Users;
