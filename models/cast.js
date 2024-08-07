const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');
const Actor = require('./actor');
const Content = require('./content');

const Cast = sequelize.define("Cast", {
  content_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Content,
      key: 'id'
    },
    allowNull: false,
  },
  actor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Actor,
      key: 'id'
    },
    allowNull: false,
  },
}, {
  tableName: "cast", // Nombre de la tabla en la base de datos
  timestamps: false  // Desactiva los campos createdAt y updatedAt
});

module.exports = Cast;
