const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db'); // Asegúrate de que la instancia de sequelize está correctamente exportada

const Actor = sequelize.define('Actor', {
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
  tableName: 'actors',
  timestamps: false,
});

module.exports = Actor;
