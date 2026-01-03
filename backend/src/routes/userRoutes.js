/**
 * User Routes
 * Routes untuk manajemen user (admin only)
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const { auth } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

// All routes require admin authentication
router.use(auth);

// Admin only routes
router.get('/', adminOnly, userController.getAllUsers);
router.get('/stats', adminOnly, userController.getStats);
router.get('/:id', adminOnly, userController.getUserById);

router.post('/', adminOnly, [
  body('username').trim().isLength({ min: 3, max: 30 }).withMessage('Username 3-30 karakter'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
  body('role').isIn(['admin', 'editor', 'viewer']).withMessage('Role tidak valid')
], userController.createUser);

router.put('/:id', adminOnly, [
  body('username').optional().trim().isLength({ min: 3, max: 30 }).withMessage('Username 3-30 karakter'),
  body('email').optional().isEmail().withMessage('Email tidak valid'),
  body('role').optional().isIn(['admin', 'editor', 'viewer']).withMessage('Role tidak valid')
], userController.updateUser);

router.put('/:id/reset-password', adminOnly, [
  body('newPassword').isLength({ min: 6 }).withMessage('Password minimal 6 karakter')
], userController.resetPassword);

router.delete('/:id', adminOnly, userController.deleteUser);

module.exports = router;

