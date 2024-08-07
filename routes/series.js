// routes/series.js
const express = require('express');
const router = express.Router();
const { Content } = require('../models'); // Asegúrate de que la importación sea correcta
const { Op } = require('sequelize');

// Obtener todas las series
router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        console.log('Nombre de búsqueda:', name); // Añade esta línea para depuración
        const whereCondition = {
                category_id: 1 // Ajusta según tu lógica de categorías para series
        };
        if (name && name.trim() !== '') {
            whereCondition.title = {
                [Op.like]: `%${name.trim()}%`
            };
        }
        const series = await Content.findAll({
            where: whereCondition
        });
        // Transformar los datos para que coincidan con los nombres de propiedad en la vista
        const seriesData = series.map(serie => ({
            titulo: serie.title, // Cambia 'title' a 'titulo'
            trailer: serie.trailer_url, // Cambia 'trailer_url' a 'trailer'
            duracion: serie.duration, // Cambia 'duration' a 'duracion'
            temporadas: serie.temporadas // Cambia 'temporadas' a 'temporadas'
        }));
        res.render('series', { series: seriesData }); // Renderiza 'series.ejs' en la carpeta 'views'
    } catch (error) {
        console.error('Error al obtener las series:', error);
        res.status(500).send('Error al obtener las series');
    }
});

module.exports = router;
