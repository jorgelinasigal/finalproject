// routes/peliculas.js
const express = require('express');
const router = express.Router();
const { Content } = require('../models'); // Asegúrate de que la importación sea correcta

// Obtener todas las películas
router.get('/', async (req, res) => {
    try {
        const peliculas = await Content.findAll({
            where: {
                category_id: 2 // Ajusta según tu lógica de categorías
            }
        });
        // Transformar los datos para que coincidan con los nombres de propiedad en la vista
        const peliculasData = peliculas.map(pelicula => ({
            titulo: pelicula.title, // Cambia 'title' a 'titulo'
            trailer: pelicula.trailer_url, // Cambia 'trailer_url' a 'trailer'
            duracion: pelicula.duracion // Agrega una duración predeterminada si no la tienes en el modelo
        }));
        res.render('Pelicula', { peliculas: peliculasData }); 
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        res.status(500).send('Error al obtener las películas');
    }
});

module.exports = router;
