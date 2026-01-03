/**
 * Agenda Routes
 * Routes untuk manajemen agenda/kegiatan
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const agendaController = require('../controllers/agendaController');
const { auth, optionalAuth } = require('../middleware/authMiddleware');
const { adminOrEditor, adminOnly } = require('../middleware/roleMiddleware');
const { uploadImage } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', optionalAuth, agendaController.getAllAgenda);
router.get('/upcoming', agendaController.getUpcomingAgenda);
router.get('/:id', optionalAuth, agendaController.getAgendaById);

// Protected routes (admin/editor)
router.post('/', auth, adminOrEditor, [
  body('title').trim().notEmpty().withMessage('Judul wajib diisi'),
  body('description').trim().notEmpty().withMessage('Deskripsi wajib diisi'),
  body('date').isISO8601().withMessage('Tanggal tidak valid'),
  body('location').trim().notEmpty().withMessage('Lokasi wajib diisi')
], uploadImage.single('image'), agendaController.createAgenda);

router.put('/:id', auth, adminOrEditor, uploadImage.single('image'), agendaController.updateAgenda);
router.put('/:id/toggle-publish', auth, adminOrEditor, agendaController.togglePublish);

// Admin only routes
router.delete('/:id', auth, adminOnly, agendaController.deleteAgenda);

module.exports = router;

