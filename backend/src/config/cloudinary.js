/**
 * Cloudinary Configuration
 * Mengatur upload gambar ke Cloudinary untuk galeri dan konten
 */

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Konfigurasi Cloudinary dari environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Verifikasi konfigurasi
const verifyConfig = () => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || 
      !process.env.CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
    console.warn('⚠️ Cloudinary configuration incomplete. Upload will fail.');
    return false;
  }
  return true;
};

// Storage engine untuk Multer + Cloudinary
const createCloudinaryStorage = (folder = 'pramuka') => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder, // Nama folder di Cloudinary
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mov', 'avi'],
      resource_type: 'auto', // Otomatis detect type (image/video)
      transformation: [
        { quality: 'auto:best' }, // Optimasi kualitas
        { fetch_format: 'auto' } // Format otomatis
      ]
    },
  });
};

// Fungsi helper untuk upload manual
const uploadToCloudinary = async (filePath, folder = 'pramuka') => {
  try {
    if (!verifyConfig()) {
      throw new Error('Cloudinary configuration incomplete');
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto:best' },
        { fetch_format: 'auto' }
      ]
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
      width: result.width,
      height: result.height
    };
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error.message);
    throw error;
  }
};

// Fungsi untuk delete gambar
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    if (!verifyConfig()) {
      throw new Error('Cloudinary configuration incomplete');
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });

    return result;
  } catch (error) {
    console.error('❌ Cloudinary delete error:', error.message);
    throw error;
  }
};

module.exports = {
  cloudinary,
  createCloudinaryStorage,
  uploadToCloudinary,
  deleteFromCloudinary,
  verifyConfig
};

