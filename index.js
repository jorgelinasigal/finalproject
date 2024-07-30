require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const { sequelize, authenticate, closeConnection } = require("./database/db");
const initContentModel = require("./models/content");
const { DataTypes } = require("sequelize");

const app = express();
const port = process.env.PORT || 3008;

// Inicializar el modelo
const Content = initContentModel(sequelize, DataTypes);

// Función para mapear géneros y categorías a sus correspondientes IDs
const mapGenreToId = (genre) => {
  const genreMapping = {
    Drama: 1,
    Comedy: 2,
    Action: 3,
    // Agrega todos los géneros que necesites
  };
  return genreMapping[genre] || 0; // 0 o cualquier valor por defecto
};

const mapCategoryToId = (category) => {
  const categoryMapping = {
    Movie: 1,
    Series: 2,
    // Agrega todas las categorías que necesites
  };
  return categoryMapping[category] || 0; // 0 o cualquier valor por defecto
};

// Función para cargar y transformar datos
const loadData = async () => {
  const dataPath = process.env.DATA_PATH;
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const contents = JSON.parse(rawData);

  for (const content of contents) {
    const nuevoContenido = {
      title: content.titulo,
      synopsis: content.sinopsis,
      trailer_url: content.url,
      category: mapCategoryToId(content.categoria),
      genre: mapGenreToId(content.genero)
    }
    try {
      await Content.create(nuevoContenido);
    } catch (error) {
      console.error('Error al crear contenido:', error);
    }
  }
};

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Trailerflix API</h1>");
});

app.listen(port, async () => {
  try {
    await authenticate();
    await sequelize.sync({ force: false }); // Cambié { force: true } a { force: false } para no borrar y recrear las tablas cada vez
    await loadData(); // Carga los datos después de sincronizar la base de datos
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

// Cerrar la conexión cuando la aplicación se cierra
process.on("SIGINT", async () => {
  await closeConnection();
  process.exit(0);
});
