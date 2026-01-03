/**
 * Galeri Routes
 * Routes untuk manajemen galeri foto/video
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const galeriController = require('../controllers/galeriController');
const { auth, optionalAuth } = require('../middleware/authMiddleware');
const { adminOrEditor, adminOnly } = require('../middleware/roleMiddleware');
const { uploadGallery } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', optionalAuth, galeriController.getAllGaleri);
router.get('/photos', galeriController.getPhotos);
router.get('/videos', galeriController.getVideos);
router.get('/stats', galeriController.getStats);
router.get('/:id', optionalAuth, galeriController.getGaleriById);

// Protected routes (admin/editor)
router.post('/', auth, adminOrEditor, [
  body('title').trim().notEmpty().withMessage('Judul wajib diisi'),
  body('type').optional().isIn(['photo', 'video']).withMessage('Type tidak valid')
], uploadGallery.single('image'), galeriController.createGaleri);

router.put('/:id', auth, adminOrEditor, uploadGallery.single('image'), galeriController.updateGaleri);

// Admin only routes
router.delete('/:id', auth, adminOnly, galeriController.deleteGaleri);

module.exports = router;

