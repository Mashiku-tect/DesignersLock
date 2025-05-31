const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'messages',
  timestamps: true // adds createdAt and updatedAt
});

Message.associate = function(models) {
Message.belongsTo(models.Users, {
  as: 'Sender',
  foreignKey: 'sender_id',
  targetKey: 'user_id'  // important: your primary key in User
});

Message.belongsTo(models.Users, {
  as: 'Receiver',
  foreignKey: 'receiver_id',
  targetKey: 'user_id'  // important: your primary key in User
});
}

module.exports = Message;
