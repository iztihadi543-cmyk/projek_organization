const express = require('express');
const router = express.Router();
const { getVisiMisi, updateVisiMisi } = require('../controllers/visiMisiController');
const { protect, admin } = require('../middleware/authMiddleware'); // Pastikan middleware auth sudah ada

// Route Public (Bisa diakses siapa saja untuk dilihat di halaman depan)
router.get('/', getVisiMisi);

// Route Private (Hanya Admin yang bisa edit)
router.put('/', protect, admin, updateVisiMisi);

module.exports = router;