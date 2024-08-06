require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const { sequelize, authenticate, closeConnection } = require("./database/db");
const { DataTypes } = require("sequelize");

// Inicializar los modelos
const initContentModel = require("./models/content");
const initActorModel = require("./models/actor");
const initCastModel = require("./models/cast");
const initCategoryModel = require("./models/category");
const initGenreModel = require("./models/genre");

const Content = initContentModel(sequelize, DataTypes);
const Actor = initActorModel(sequelize, DataTypes);
const Cast = initCastModel(sequelize, DataTypes);
const Category = initCategoryModel(sequelize, DataTypes);
const Genre = initGenreModel(sequelize, DataTypes);

const app = express();
const port = process.env.PORT || 3008;

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
      category_id: mapCategoryToId(content.categoria),
      genre_id: mapGenreToId(content.genero)
    };
    try {
      await Content.create(nuevoContenido);
    } catch (error) {
      console.error('Error al crear contenido:', error);
    }

    for (const actor of content.actores) {
      const nuevoActor = {
        name: actor.nombre
      };
      try {
        await Actor.create(nuevoActor);
      } catch (error) {
        console.error('Error al crear actor:', error);
      }
    }

    for (const cast of content.reparto) {
      const nuevoCast = {
        name: cast.nombre
      };
      try {
        await Cast.create(nuevoCast);
      } catch (error) {
        console.error('Error al crear cast:', error);
      }
    }

    const nuevoCategory = {
      name: content.categoria
    };
    try {
      await Category.create(nuevoCategory);
    } catch (error) {
      console.error('Error al crear categoría:', error);
    }

    const nuevoGenre = {
      name: content.genero
    };
    try {
      await Genre.create(nuevoGenre);
    } catch (error) {
      console.error('Error al crear género:', error);
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