const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'categories',
  timestamps: false,
});

module.exports = Category;
