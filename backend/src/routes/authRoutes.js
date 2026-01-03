const express = require('express');
const router = express.Router();

// Pastikan import ini benar dan filenya ada
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;