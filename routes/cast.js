const express = require('express');
const router = express.Router();
const { Cast } = require('../models'); // Asegúrate de importar el modelo necesario

// Obtener todos los elencos
router.get('/', async (req, res) => {
    try {
        const cast = await Cast.findAll();
        res.json(cast);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un elenco por ID
router.get('/:id', async (req, res) => {
    try {
        const cast = await Cast.findByPk(req.params.id);
        if (cast) {
            res.json(cast);
        } else {
            res.status(404).json({ error: 'Elenco no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
