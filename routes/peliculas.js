// routes/peliculas.js
const express = require('express');
const router = express.Router();
const { Content } = require('../models'); // Asegúrate de que la importación sea correcta
const { Op } = require('sequelize');


router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        console.log('Nombre de búsqueda:', name); // Añade esta línea para depuración

        const whereCondition = {
            category_id: 2
        };
        
        if (name && name.trim() !== '') {
            whereCondition.title = {
                [Op.like]: `%${name.trim()}%`
            };
        }
        
        const peliculas = await Content.findAll({
            where: whereCondition
        });

        const peliculasData = peliculas.map(pelicula => ({
            titulo: pelicula.title,
            trailer: pelicula.trailer_url,
            duracion: pelicula.duracion
        }));

        res.render('Pelicula', { peliculas: peliculasData }); 
    } catch (error) {
        console.error('Error al obtener las películas:', error.message);
        res.status(500).send('Error al obtener las películas');
    }
});

module.exports = router;
