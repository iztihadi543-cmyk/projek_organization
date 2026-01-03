/**
 * Auth Routes
 * Routes untuk autentikasi user
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { auth } = require('../middleware/authMiddleware');

// Validation rules
const registerValidation = [
  body('username').trim().isLength({ min: 3, max: 30 }).withMessage('Username 3-30 karakter'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter')
];

const loginValidation = [
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').notEmpty().withMessage('Password wajib diisi')
];

// Public routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);

// Protected routes
router.get('/me', auth, authController.getMe);
router.put('/profile', auth, authController.updateProfile);
router.put('/password', auth, [
  body('currentPassword').notEmpty().withMessage('Password saat ini wajib diisi'),
  body('newPassword').isLength({ min: 6 }).withMessage('Password baru minimal 6 karakter')
], authController.changePassword);
router.post('/logout', auth, authController.logout);

module.exports = router;

