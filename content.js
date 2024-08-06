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
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      genre: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "contents", // Nombre de la tabla en la base de datos (opcional)
    }
  );
  return Content;
};
