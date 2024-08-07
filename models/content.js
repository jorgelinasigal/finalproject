const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const Category = require('./category');
const Genre = require('./genre');

const Content = sequelize.define("Content", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  trailer_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  duration: { 
    type: DataTypes.STRING,
    allowNull: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
  },
  genre_id: { // Asegúrate de que genre_id está correctamente relacionado en la base de datos
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Genre,
      key: 'id',
    },
  },
}, {
  tableName: "contents", // Nombre de la tabla en la base de datos (opcional)
  timestamps: false // Desactiva timestamps si no necesitas createdAt y updatedAt
});

module.exports = Content;
