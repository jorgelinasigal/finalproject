const express = require('express');
const path = require('path');
const fs = require('fs');
const { Sequelize, DataTypes, Op } = require('sequelize');
const { sequelize, authenticate, closeConnection } = require('./database/db');
const { Content, Cast, Actor, Genre, Category } = require('./models');
const app = express();
const PORT = process.env.PORT || 3008;
require('dotenv').config();

// Configura el directorio de vistas y el motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analizar cuerpos de solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importa y usa las rutas definidas en la carpeta routes
const contentRouter = require('./routes/content');
const peliculasRoutes = require('./routes/peliculas');
const seriesRoutes = require('./routes/series');  
app.use('/peliculas', peliculasRoutes);
app.use('/series', seriesRoutes);
app.use('/content', contentRouter);

// Función para cargar y transformar datos
const loadData = async () => {
  const dataPath = process.env.DATA_PATH;
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const contents = JSON.parse(rawData);

  for (const content of contents) {
    // Buscar o crear la categoría
    let category = await Category.findOne({ where: { name: content.categoria } });
    if (!category) {
      category = await Category.create({ name: content.categoria });
    }

    // Buscar o crear el género
    let genre = await Genre.findOne({ where: { name: content.genero } });
    if (!genre) {
      genre = await Genre.create({ name: content.genero });
    }

    // Crear el contenido
    const nuevoContenido = {
      title: content.titulo,
      synopsis: content.resumen,
      trailer_url: content.trailer,
      category_id: category.id,  // Usa el ID de la categoría
      genre_id: genre.id,        // Usa el ID del género
    };

    let createdContent;
    try {
      createdContent = await Content.create(nuevoContenido);
    } catch (error) {
      console.error('Error al crear contenido:', error);
      continue; // Salta al siguiente contenido en caso de error
    }

    // Manejar actores
    const actorIds = [];
    if (Array.isArray(content.actor)) {
      for (const actor of content.actor) {
        const nuevoActor = { name: actor.nombre };
        let createdActor;
        try {
          createdActor = await Actor.create(nuevoActor);
        } catch (error) {
          console.error('Error al crear actor:', error);
          continue; // Salta al siguiente actor en caso de error
        }
        actorIds.push(createdActor.id); // Guarda el ID del actor
      }
    } else {
      console.warn('content.actor no es un array o no está definido');
    }

    // Manejar reparto
    if (typeof content.reparto === 'string') {
      const actors = content.reparto.split(',').map(name => name.trim());
      for (const actorName of actors) {
        if (actorName) {
          let actor;
          try {
            actor = await Actor.findOne({ where: { name: actorName } });
            if (!actor) {
              actor = await Actor.create({ name: actorName });
            }
          } catch (error) {
            console.error('Error al crear o buscar actor:', error);
            continue; // Salta al siguiente actor en caso de error
          }

          try {
            await Cast.create({
              content_id: createdContent.id,  // ID del contenido creado
              actor_id: actor.id             // ID del actor encontrado o creado
            });
          } catch (error) {
            console.error('Error al crear cast:', error);
          }
        }
      }
    } else {
      console.warn('content.reparto no es una cadena de texto o no está definido');
    }
  }
};

// Agregar un endpoint de ejemplo para la vista
app.get('/', (req, res) => {
  res.render('index'); // Renderiza la vista 'index.ejs' en la carpeta 'views'
});

// Endpoint de prueba para verificar si el servidor está funcionando
app.get('/test', (req, res) => {
  res.send('El servidor está funcionando correctamente');
});

app.listen(PORT, async () => {
  try {
    await authenticate();
    await sequelize.sync({ force: false }); // Cambié { force: true } a { force: false } para no borrar y recrear las tablas cada vez
    await loadData(); // Carga los datos después de sincronizar la base de datos
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

// Cerrar la conexión cuando la aplicación se cierra
process.on("SIGINT", async () => {
  await closeConnection();
  process.exit(0);
});
