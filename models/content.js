// Remueve esta línea porque DataTypes será pasado como un argumento en la función
// const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define(
    "content", // Nombre del modelo
    {
      // Atributos del modelo
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false, // Corrige el typo de "alowNull" a "allowNull"
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: true, // Corrige el typo de "alowNull" a "allowNull"
      },
      trailer_url: {
        type: DataTypes.STRING, // Cambia VARCHAR a STRING, ya que VARCHAR no es válido en Sequelize
        allowNull: true, // Corrige el typo de "alowNull" a "allowNull"
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: false, // Corrige el typo de "alowNull" a "allowNull"
      },
      genre: {
        type: DataTypes.INTEGER,
        allowNull: false, // Corrige el typo de "alowNull" a "allowNull"
      },
    },
    {
      // Opciones
      timestamps: true, // Incluye campos `createdAt` y `updatedAt`
      underscored: true, // Utiliza snake_case en lugar de camelCase
    }
  );

  return Content;
};