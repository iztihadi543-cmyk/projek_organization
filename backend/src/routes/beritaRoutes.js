const express = require('express');
const router = express.Router();
const { getBerita, createBerita, deleteBerita } = require('../controllers/beritaController');

router.get('/', getBerita);
router.post('/', createBerita);
router.delete('/:id', deleteBerita); // Tambahan fitur delete

module.exports = router;