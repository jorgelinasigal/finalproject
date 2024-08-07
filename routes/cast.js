const express = require('express');
const router = express.Router();
const { Cast, Content, Actor } = require('../models'); // Asegúrate de importar los modelos necesarios
const { Op } = require('sequelize');

// Obtener todos los elencos
router.get('/', async (req, res) => {
    try {
        const cast = await Cast.findAll();
        res.json(cast);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un elenco por ID o por nombre de actor
router.get('/:identifier', async (req, res) => {
    try {
        const identifier = req.params.identifier;

        if (isNaN(identifier)) {
            // Si identifier no es un número, buscar por nombre del actor
            const cast = await Cast.findAll({
                include: [
                    {
                        model: Actor,
                        attributes: ['name'], // Solo incluir el nombre del actor
                        where: {
                            name: { [Op.like]: `%${identifier}%` }
                        }
                    },
                    {
                        model: Content,
                        attributes: ['title', 'synopsis', 'trailer_url', 'duration', 'category_id', 'genre_id'] // Incluir atributos relevantes de Content
                    }
                ]
            });

            if (cast && cast.length > 0) {
                res.json(cast);
            } else {
                res.status(404).json({ error: 'Elenco no encontrado' });
            }
        } else {
            // Si identifier es un número, buscar por ID de cast
            const cast = await Cast.findByPk(identifier, {
                include: [
                    {
                        model: Actor,
                        attributes: ['name'] // Solo incluir el nombre del actor
                    },
                    {
                        model: Content,
                        attributes: ['title', 'synopsis', 'trailer_url', 'duration', 'category_id', 'genre_id'] // Incluir atributos relevantes de Content
                    }
                ]
            });

            if (cast) {
                res.json(cast);
            } else {
                res.status(404).json({ error: 'Elenco no encontrado' });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
