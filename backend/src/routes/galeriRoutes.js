const express = require('express');
const router = express.Router();
const { getGaleri, createGaleri, deleteGaleri } = require('../controllers/galeriController');

router.get('/', getGaleri);
router.post('/', createGaleri);
router.delete('/:id', deleteGaleri);

module.exports = router;