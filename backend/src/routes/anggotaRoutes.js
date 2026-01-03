/**
 * Anggota Routes
 * Routes untuk manajemen anggota
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const anggotaController = require('../controllers/anggotaController');
const { auth, optionalAuth } = require('../middleware/authMiddleware');
const { adminOrEditor, adminOnly } = require('../middleware/roleMiddleware');
const { uploadPhoto } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', optionalAuth, anggotaController.getAllAnggota);
router.get('/active', anggotaController.getActiveAnggota);
router.get('/pengurus', anggotaController.getPengurus);
router.get('/stats', anggotaController.getStats);
router.get('/:id', optionalAuth, anggotaController.getAnggotaById);

// Protected routes (admin/editor)
router.post('/', auth, adminOrEditor, [
  body('nama').trim().notEmpty().withMessage('Nama wajib diisi'),
  body('jabatan').trim().notEmpty().withMessage('Jabatan wajib diisi')
], uploadPhoto.single('foto'), anggotaController.createAnggota);

router.put('/:id', auth, adminOrEditor, uploadPhoto.single('foto'), anggotaController.updateAnggota);

// Admin only routes
router.delete('/:id', auth, adminOnly, anggotaController.deleteAnggota);

module.exports = router;

