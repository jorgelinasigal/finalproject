const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Content = require('./content');
const Cast = require('./cast');
const Actor = require('./actor');
const Genre = require('./genre');
const Category = require('./category');

// Definir las relaciones entre modelos si es necesario
Content.belongsTo(Category, { foreignKey: 'category_id' });
Content.belongsTo(Genre, { foreignKey: 'genre_id' });
Cast.belongsTo(Content, { foreignKey: 'content_id' });
Cast.belongsTo(Actor, { foreignKey: 'actor_id' });

 
module.exports = {
  sequelize,
  Content,
  Cast,
  Actor,
  Genre,
  Category,
};
