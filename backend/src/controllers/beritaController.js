/**
 * Berita Controller
 * CRUD operations untuk berita/artikel
 */

const Berita = require('../models/Berita');
const { validationResult } = require('express-validator');
const { deleteFromCloudinary } = require('../config/cloudinary');

/**
 * @desc    Get all berita
 * @route   GET /api/berita
 * @access  Public
 */
exports.getAllBerita = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status = 'published',
      category,
      search,
      featured
    } = req.query;

    // Build query
    const query = {};
    
    // Filter by status (public hanya bisa see published)
    if (status && req.user && (req.user.role === 'admin' || req.user.role === 'editor')) {
      query.status = status;
    } else {
      query.status = 'published';
    }

    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query dengan pagination
    const berita = await Berita.find(query)
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('author', 'username avatar');

    const total = await Berita.countDocuments(query);

    res.json({
      success: true,
      data: berita,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get all berita error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get single berita by slug
 * @route   GET /api/berita/:slug
 * @access  Public
 */
exports.getBeritaBySlug = async (req, res) => {
  try {
    const berita = await Berita.findOne({ 
      slug: req.params.slug,
      status: 'published'
    }).populate('author', 'username avatar');

    if (!berita) {
      return res.status(404).json({
        success: false,
        message: 'Berita tidak ditemukan'
      });
    }

    // Increment views
    berita.views += 1;
    await berita.save();

    res.json({
      success: true,
      data: berita
    });
  } catch (error) {
    console.error('Get berita by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get single berita by ID
 * @route   GET /api/berita/id/:id
 * @access  Private (admin/editor)
 */
exports.getBeritaById = async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id)
      .populate('author', 'username avatar');

    if (!berita) {
      return res.status(404).json({
        success: false,
        message: 'Berita tidak ditemukan'
      });
    }

    res.json({
      success: true,
      data: berita
    });
  } catch (error) {
    console.error('Get berita by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Create berita
 * @route   POST /api/berita
 * @access  Private (admin/editor)
 */
exports.createBerita = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { title, content, excerpt, category, tags, status, isFeatured } = req.body;

    // Handle image upload
    let imageData = {};
    if (req.file) {
      imageData = {
        image: req.file.path,
        imagePublicId: req.file.filename
      };
    }

    // Create berita
    const berita = new Berita({
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      category: category || 'berita',
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      status: status || 'draft',
      isFeatured: isFeatured || false,
      author: req.user._id,
      ...imageData
    });

    // Auto publish jika status = published
    if (berita.status === 'published' && !berita.publishedAt) {
      berita.publishedAt = new Date();
    }

    await berita.save();
    await berita.populate('author', 'username avatar');

    res.status(201).json({
      success: true,
      message: 'Berita berhasil dibuat',
      data: berita
    });
  } catch (error) {
    console.error('Create berita error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error saat membuat berita'
    });
  }
};

/**
 * @desc    Update berita
 * @route   PUT /api/berita/:id
 * @access  Private (admin/editor)
 */
exports.updateBerita = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    let berita = await Berita.findById(req.params.id);

    if (!berita) {
      return res.status(404).json({
        success: false,
        message: 'Berita tidak ditemukan'
      });
    }

    // Handle image update
    if (req.file) {
      // Delete old image
      if (berita.imagePublicId) {
        await deleteFromCloudinary(berita.imagePublicId);
      }
      req.body.image = req.file.path;
      req.body.imagePublicId = req.file.filename;
    }

    // Handle status change
    if (req.body.status === 'published' && !berita.publishedAt) {
      req.body.publishedAt = new Date();
    }

    // Update berita
    berita = await Berita.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('author', 'username avatar');

    res.json({
      success: true,
      message: 'Berita berhasil diperbarui',
      data: berita
    });
  } catch (error) {
    console.error('Update berita error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error saat memperbarui berita'
    });
  }
};

/**
 * @desc    Delete berita
 * @route   DELETE /api/berita/:id
 * @access  Private (admin only)
 */
exports.deleteBerita = async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);

    if (!berita) {
      return res.status(404).json({
        success: false,
        message: 'Berita tidak ditemukan'
      });
    }

    // Delete image from Cloudinary
    if (berita.imagePublicId) {
      await deleteFromCloudinary(berita.imagePublicId);
    }

    await berita.deleteOne();

    res.json({
      success: true,
      message: 'Berita berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete berita error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error saat menghapus berita'
    });
  }
};

/**
 * @desc    Publish/Unpublish berita
 * @route   PUT /api/berita/:id/publish
 * @access  Private (admin/editor)
 */
exports.togglePublish = async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);

    if (!berita) {
      return res.status(404).json({
        success: false,
        message: 'Berita tidak ditemukan'
      });
    }

    if (berita.status === 'published') {
      berita.status = 'draft';
      await berita.save();
    } else {
      berita.status = 'published';
      berita.publishedAt = new Date();
      await berita.save();
    }

    res.json({
      success: true,
      message: berita.status === 'published' ? 'Berita dipublikasikan' : 'Berita dijadikan draft',
      data: berita
    });
  } catch (error) {
    console.error('Toggle publish error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get featured berita
 * @route   GET /api/berita/featured
 * @access  Public
 */
exports.getFeaturedBerita = async (req, res) => {
  try {
    const { limit = 3 } = req.query;
    const berita = await Berita.getFeatured(parseInt(limit));

    res.json({
      success: true,
      data: berita
    });
  } catch (error) {
    console.error('Get featured berita error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

