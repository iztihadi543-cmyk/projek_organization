/**
 * Server Entry Point
 * Menjalankan server Express dan menghubungkan ke MongoDB
 */

require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const cloudinary = require('cloudinary').v2;

// Check required environment variables
const checkEnv = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
    console.log('📝 Please copy .env.example to .env and fill in the values');
    process.exit(1);
  }
};

// Configure Cloudinary if credentials provided
const configureCloudinary = () => {
  if (process.env.CLOUDINARY_CLOUD_NAME && 
      process.env.CLOUDINARY_API_KEY && 
      process.env.CLOUDINARY_API_SECRET) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log('✅ Cloudinary configured');
  } else {
    console.warn('⚠️ Cloudinary not configured. Upload features will fail.');
  }
};

// Start server
const startServer = async () => {
  try {
    // Check environment variables
    checkEnv();
    
    // Connect to MongoDB
    await connectDB();
    
    // Configure Cloudinary
    configureCloudinary();
    
    // Get port from environment or default
    const PORT = process.env.PORT || 5000;
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Pramuka Organization API Server                      ║
║                                                           ║
║   Server running on port ${PORT}                             ║
║   Environment: ${process.env.NODE_ENV || 'development'}                            ║
║                                                           ║
║   API Endpoints:                                          ║
║   - Auth:       POST /api/auth/login                      ║
║   - Berita:     GET  /api/berita                          ║
║   - Agenda:     GET  /api/agenda                          ║
║   - Galeri:     GET  /api/galeri                          ║
║   - Anggota:    GET  /api/anggota                         ║
║   - Struktur:   GET  /api/struktur                        ║
║   - Users:      GET  /api/users (admin)                   ║
║                                                           ║
║   Health Check: GET /api/health                           ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

startServer();

