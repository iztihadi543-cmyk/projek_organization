/**
 * Authentication Middleware
 * Memverifikasi JWT token dan melampirkan user ke request
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Verify JWT token dari Authorization header
 */
const auth = async (req, res, next) => {
  try {
    // Get token dari header
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Akses ditolak. Token tidak ditemukan.'
      });
    }

    // Verifikasi format "Bearer <token>"
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Format token tidak valid. Gunakan format Bearer.'
      });
    }

    const token = authHeader.replace('Bearer ', '');

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Cari user berdasarkan ID dari token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User tidak ditemukan.'
      });
    }

    // Check apakah user masih aktif
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Akun telah dinonaktifkan.'
      });
    }

    // Lampirkan user dan token ke request
    req.user = user;
    req.token = token;
    req.userData = decoded;

    next();
  } catch (error) {
    // Handle berbagai jenis error JWT
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token tidak valid.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token telah expired.'
      });
    }

    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error pada autentikasi.'
    });
  }
};

/**
 * Optional auth - tidak wajib login tapi tetap attach user jika ada token
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      
      if (user && user.isActive) {
        req.user = user;
        req.token = token;
        req.userData = decoded;
      }
    }
    
    next();
  } catch (error) {
    // Jika error, lanjutkan tanpa user (optional)
    next();
  }
};

module.exports = { auth, optionalAuth };

