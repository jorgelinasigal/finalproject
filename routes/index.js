const express = require('express');
const router = express.Router();
const Content = require('../models/content'); // Asegúrate de que este archivo exporte Pelicula
const Actor = require('../models/actor'); // Asegúrate de que este archivo exporte Actor

// Ruta para obtener todas las películas y renderizarlas
router.get('/peliculas', async (req, res) => {
    try {
      const peliculas = await Content.findAll();
      res.render('peliculas', { peliculas });  // Pasa la lista de películas a la vista
    } catch (error) {
      console.error('Error al obtener películas:', error);
      res.status(500).send('Error al obtener películas');
    }
  });
  
module.exports = router;
