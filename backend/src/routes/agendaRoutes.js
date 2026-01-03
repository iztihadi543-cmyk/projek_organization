const express = require('express');
const router = express.Router();
// Import fungsi dari controller yang kita buat di atas
const { getAgenda, createAgenda } = require('../controllers/agendaController');

router.get('/', getAgenda);
router.post('/', createAgenda);

module.exports = router; // <--- PENTING: Ini yang bikin error hilang