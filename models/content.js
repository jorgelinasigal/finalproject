// Remueve esta línea porque DataTypes será pasado como un argumento en la función
// const { DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define(
    "Content", 
    {
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
      category_id: {  // Cambié category a category_id
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      genre_id: {  // Cambié genre a genre_id
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "contents", // Nombre de la tabla en la base de datos (opcional)
      timestamps: false
    }
  ); 

  Content.associate = (models) => {
    // Una película (o contenido) puede tener muchos actores (reparto) y viceversa
    Content.hasMany(models.Cast, { foreignKey: 'content_id'});
  };
  return Content;
};
