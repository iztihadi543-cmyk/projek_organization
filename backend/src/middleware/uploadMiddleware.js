/**
 * Upload Middleware
 * Menangani upload file menggunakan Multer dengan Cloudinary storage
 */

const multer = require('multer');
const { createCloudinaryStorage, verifyConfig } = require('../config/cloudinary');

/**
 * Fungsi untuk membuat upload middleware dengan konfigurasi kustom
 */
const createUploadMiddleware = (options = {}) => {
  const {
    folder = 'pramuka',
    fieldName = 'image',
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  } = options;

  // Check Cloudinary config
  if (!verifyConfig()) {
    console.warn('⚠️ Cloudinary not configured. Upload will fail.');
  }

  // Create Cloudinary storage
  const storage = createCloudinaryStorage(folder);

  // Create multer upload
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: maxSize
    },
    fileFilter: (req, file, cb) => {
      // Check file type
      if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error(
          `Tipe file tidak diizinkan. Hanya ${allowedTypes.join(', ')} yang diperbolehkan.`
        );
        error.code = 'LIMIT_FILE_TYPES';
        return cb(error, false);
      }
      cb(null, true);
    }
  });

  return upload;
};

// Upload middleware untuk gambar umum
const uploadImage = createUploadMiddleware({
  folder: 'pramuka/images',
  fieldName: 'image',
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
});

// Upload middleware untuk galeri
const uploadGallery = createUploadMiddleware({
  folder: 'pramuka/gallery',
  fieldName: 'image',
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
});

// Upload middleware untuk foto anggota/struktur
const uploadPhoto = createUploadMiddleware({
  folder: 'pramuka/photos',
  fieldName: 'foto',
  maxSize: 3 * 1024 * 1024, // 3MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif']
});

// Upload untuk multiple gambar (array)
const uploadMultiple = createUploadMiddleware({
  folder: 'pramuka/gallery',
  fieldName: 'images',
  maxSize: 10 * 1024 * 1024
});

// Error handler untuk multer
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File terlalu besar. Maksimal ukuran file adalah 10MB.'
      });
    }

    if (err.code === 'LIMIT_FILE_TYPES') {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`
    });
  }

  if (err) {
    console.error('Upload error:', err);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengupload file.'
    });
  }

  next();
};

module.exports = {
  createUploadMiddleware,
  uploadImage,
  uploadGallery,
  uploadPhoto,
  uploadMultiple,
  handleUploadError
};

