/**
 * Berita Routes
 * Routes untuk manajemen berita/artikel
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const beritaController = require('../controllers/beritaController');
const { auth, optionalAuth } = require('../middleware/authMiddleware');
const { adminOrEditor, adminOnly } = require('../middleware/roleMiddleware');
const { uploadImage } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', optionalAuth, beritaController.getAllBerita);
router.get('/featured', beritaController.getFeaturedBerita);
router.get('/:slug', beritaController.getBeritaBySlug);

// Protected routes (admin/editor)
router.get('/admin/:id', auth, adminOrEditor, beritaController.getBeritaById);
router.post('/', auth, adminOrEditor, [
  body('title').trim().notEmpty().withMessage('Judul wajib diisi'),
  body('content').trim().notEmpty().withMessage('Konten wajib diisi')
], uploadImage.single('image'), beritaController.createBerita);

router.put('/:id', auth, adminOrEditor, [
  body('title').optional().trim().notEmpty().withMessage('Judul tidak boleh kosong'),
  body('content').optional().trim().notEmpty().withMessage('Konten tidak boleh kosong')
], uploadImage.single('image'), beritaController.updateBerita);

router.put('/:id/publish', auth, adminOrEditor, beritaController.togglePublish);

// Admin only routes
router.delete('/:id', auth, adminOnly, beritaController.deleteBerita);

module.exports = router;

