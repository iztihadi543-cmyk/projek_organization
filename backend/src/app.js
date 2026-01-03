/**
 * Express Application Setup
 * Konfigurasi utama aplikasi Express
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { handleUploadError } = require('./middleware/uploadMiddleware');

// Import routes
const authRoutes = require('./routes/authRoutes');
const beritaRoutes = require('./routes/beritaRoutes');
const agendaRoutes = require('./routes/agendaRoutes');
const galeriRoutes = require('./routes/galeriRoutes');
const anggotaRoutes = require('./routes/anggotaRoutes');
const userRoutes = require('./routes/userRoutes');
const strukturRoutes = require('./routes/strukturRoutes');

// Initialize express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files untuk uploaded images (development)
if (process.env.NODE_ENV === 'development') {
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/berita', beritaRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/api/galeri', galeriRoutes);
app.use('/api/anggota', anggotaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/struktur', strukturRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server berjalan dengan baik',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Pramuka Organization API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      berita: '/api/berita',
      agenda: '/api/agenda',
      galeri: '/api/galeri',
      anggota: '/api/anggota',
      users: '/api/users',
      struktur: '/api/struktur'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validasi gagal',
      errors
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} sudah digunakan`
    });
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'ID tidak valid'
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token telah expired'
    });
  }

  // Multer upload error
  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
});

module.exports = app;

