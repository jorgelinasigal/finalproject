const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Asegúrate de que la instancia de sequelize está correctamente exportada

const Content = require('./content');
const Cast = require('./cast');
const Actor = require('./actor');
const Genre = require('./genre');
const Category = require('./category');

// Definir las relaciones entre modelos
Content.belongsTo(Category, { foreignKey: 'category_id' });
Content.belongsTo(Genre, { foreignKey: 'genre_id' });

Cast.belongsTo(Content, { foreignKey: 'content_id' });
Cast.belongsTo(Actor, { foreignKey: 'actor_id' });

Content.hasMany(Cast, { foreignKey: 'content_id' });
Actor.hasMany(Cast, { foreignKey: 'actor_id' });

Actor.belongsToMany(Content, { through: Cast, foreignKey: 'actor_id', otherKey: 'content_id' });
Content.belongsToMany(Actor, { through: Cast, foreignKey: 'content_id', otherKey: 'actor_id' });

module.exports = {
  sequelize,
  Content,
  Cast,
  Actor,
  Genre,
  Category,
};
