/**
 * Struktur Routes
 * Routes untuk manajemen struktur organisasi
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const strukturController = require('../controllers/strukturController');
const { auth, optionalAuth } = require('../middleware/authMiddleware');
const { adminOrEditor, adminOnly } = require('../middleware/roleMiddleware');
const { uploadPhoto } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', optionalAuth, strukturController.getAllStruktur);
router.get('/hierarchy', strukturController.getHierarchy);
router.get('/kategori/:kategori', strukturController.getByKategori);
router.get('/:id', optionalAuth, strukturController.getStrukturById);

// Protected routes (admin/editor)
router.post('/', auth, adminOrEditor, [
  body('nama').trim().notEmpty().withMessage('Nama wajib diisi'),
  body('jabatan').trim().notEmpty().withMessage('Jabatan wajib diisi')
], uploadPhoto.single('foto'), strukturController.createStruktur);

router.put('/:id', auth, adminOrEditor, uploadPhoto.single('foto'), strukturController.updateStruktur);

// Admin only routes
router.delete('/:id', auth, adminOnly, strukturController.deleteStruktur);
router.put('/reorder', auth, adminOnly, strukturController.reorderStruktur);

module.exports = router;

