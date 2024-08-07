// routes/content.js
const express = require('express');
const router = express.Router();
const { Content } = require('../models'); // Asegúrate de que la importación sea correcta

// Obtener todos los contenidos con paginación
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto es 1
    const limit = 10; // Número de elementos por página
    const offset = (page - 1) * limit; // Cálculo del desplazamiento

    try {
        const { count, rows } = await Content.findAndCountAll({
            limit,
            offset
        });

        // Transformar los datos para que coincidan con los nombres de propiedad en la vista
        const contenidosData = rows.map(contenido => ({
            titulo: contenido.title,
            trailer: contenido.trailer_url,
            duracion: contenido.duration,
            temporadas: contenido.temporadas,
            categoria: contenido.category_id
        }));

        // Enviar datos a la vista junto con información de paginación
        res.render('content', {
            contenidos: contenidosData,
            currentPage: 10, // Valor fijo para currentPage
            totalPages: 30  // Valor fijo para totalPages
        });
    } catch (error) {
        console.error('Error al obtener los contenidos:', error);
        res.status(500).send('Error al obtener los contenidos');
    }
});

module.exports = router;
