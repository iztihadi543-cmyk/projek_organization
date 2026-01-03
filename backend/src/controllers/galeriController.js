/**
 * Galeri Controller
 * CRUD operations untuk galeri foto/video
 */

const Galeri = require('../models/Galeri');
const { validationResult } = require('express-validator');
const { deleteFromCloudinary } = require('../config/cloudinary');

/**
 * @desc    Get all galeri
 * @route   GET /api/galeri
 * @access  Public
 */
exports.getAllGaleri = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12,
      type,
      category
    } = req.query;

    const query = {};

    // Public hanya bisa see published
    if (!req.user || (req.user.role === 'viewer')) {
      query.isPublished = true;
    }

    if (type) query.type = type;
    if (category) query.category = category;

    const galeri = await Galeri.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('uploadedBy', 'username');

    const total = await Galeri.countDocuments(query);

    res.json({
      success: true,
      data: galeri,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get all galeri error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get galeri photos
 * @route   GET /api/galeri/photos
 * @access  Public
 */
exports.getPhotos = async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const galeri = await Galeri.getPhotos({ limit: parseInt(limit) });

    res.json({
      success: true,
      data: galeri
    });
  } catch (error) {
    console.error('Get photos error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get galeri videos
 * @route   GET /api/galeri/videos
 * @access  Public
 */
exports.getVideos = async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const galeri = await Galeri.getVideos({ limit: parseInt(limit) });

    res.json({
      success: true,
      data: galeri
    });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get single galeri by ID
 * @route   GET /api/galeri/:id
 * @access  Public
 */
exports.getGaleriById = async (req, res) => {
  try {
    const galeri = await Galeri.findById(req.params.id)
      .populate('uploadedBy', 'username');

    if (!galeri) {
      return res.status(404).json({
        success: false,
        message: 'Item galeri tidak ditemukan'
      });
    }

    // Increment views
    galeri.views += 1;
    await galeri.save();

    res.json({
      success: true,
      data: galeri
    });
  } catch (error) {
    console.error('Get galeri by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Create galeri
 * @route   POST /api/galeri
 * @access  Private (admin/editor)
 */
exports.createGaleri = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { title, description, type, category, tags, videoUrl, isPublished } = req.body;

    // Handle image upload
    if (!req.file && type !== 'video') {
      return res.status(400).json({
        success: false,
        message: 'Gambar wajib diupload'
      });
    }

    let imageData = {};
    if (req.file) {
      imageData = {
        imageUrl: req.file.path,
        imagePublicId: req.file.filename
      };
    }

    const galeri = new Galeri({
      title,
      description,
      type: type || 'photo',
      category: category || 'kegiatan',
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      videoUrl: type === 'video' ? videoUrl : null,
      isPublished: isPublished || false,
      uploadedBy: req.user._id,
      ...imageData
    });

    await galeri.save();

    res.status(201).json({
      success: true,
      message: 'Item galeri berhasil ditambahkan',
      data: galeri
    });
  } catch (error) {
    console.error('Create galeri error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Update galeri
 * @route   PUT /api/galeri/:id
 * @access  Private (admin/editor)
 */
exports.updateGaleri = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    let galeri = await Galeri.findById(req.params.id);

    if (!galeri) {
      return res.status(404).json({
        success: false,
        message: 'Item galeri tidak ditemukan'
      });
    }

    // Handle image update
    if (req.file) {
      if (galeri.imagePublicId) {
        await deleteFromCloudinary(galeri.imagePublicId);
      }
      req.body.imageUrl = req.file.path;
      req.body.imagePublicId = req.file.filename;
    }

    galeri = await Galeri.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Item galeri berhasil diperbarui',
      data: galeri
    });
  } catch (error) {
    console.error('Update galeri error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Delete galeri
 * @route   DELETE /api/galeri/:id
 * @access  Private (admin only)
 */
exports.deleteGaleri = async (req, res) => {
  try {
    const galeri = await Galeri.findById(req.params.id);

    if (!galeri) {
      return res.status(404).json({
        success: false,
        message: 'Item galeri tidak ditemukan'
      });
    }

    // Delete image from Cloudinary
    if (galeri.imagePublicId) {
      await deleteFromCloudinary(galeri.imagePublicId);
    }

    await galeri.deleteOne();

    res.json({
      success: true,
      message: 'Item galeri berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete galeri error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get gallery stats
 * @route   GET /api/galeri/stats
 * @access  Public
 */
exports.getStats = async (req, res) => {
  try {
    const stats = await Galeri.getStats();

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

