const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Genre = sequelize.define('Genre', {
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
  tableName: 'genres',
  timestamps: false,
});

module.exports = Genre;
