/**
 * Struktur Controller
 * CRUD operations untuk struktur organisasi
 */

const Struktur = require('../models/Struktur');
const { validationResult } = require('express-validator');
const { deleteFromCloudinary } = require('../config/cloudinary');

/**
 * @desc    Get all struktur
 * @route   GET /api/struktur
 * @access  Public
 */
exports.getAllStruktur = async (req, res) => {
  try {
    const { kategori, level } = req.query;

    const query = {};

    // Public hanya bisa see published
    if (!req.user || (req.user.role === 'viewer')) {
      query.isPublished = true;
    }

    if (kategori) query.kategori = kategori;
    if (level !== undefined) query.level = parseInt(level);

    const struktur = await Struktur.find(query)
      .sort({ level: 1, urutan: 1 })
      .populate('parent', 'nama jabatan');

    const total = await Struktur.countDocuments(query);

    res.json({
      success: true,
      data: struktur,
      total
    });
  } catch (error) {
    console.error('Get all struktur error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get struktur hierarchy (tree structure)
 * @route   GET /api/struktur/hierarchy
 * @access  Public
 */
exports.getHierarchy = async (req, res) => {
  try {
    const hierarchy = await Struktur.getHierarchy();

    res.json({
      success: true,
      data: hierarchy
    });
  } catch (error) {
    console.error('Get hierarchy error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get single struktur by ID
 * @route   GET /api/struktur/:id
 * @access  Public
 */
exports.getStrukturById = async (req, res) => {
  try {
    const struktur = await Struktur.findById(req.params.id)
      .populate('parent', 'nama jabatan');

    if (!struktur) {
      return res.status(404).json({
        success: false,
        message: 'Struktur tidak ditemukan'
      });
    }

    res.json({
      success: true,
      data: struktur
    });
  } catch (error) {
    console.error('Get struktur by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Create struktur
 * @route   POST /api/struktur
 * @access  Private (admin/editor)
 */
exports.createStruktur = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { 
      nama, jabatan, parent, level, urutan, 
      kategori, periode, deskripsi, noHp, email, isPublished 
    } = req.body;

    // Handle foto upload
    let fotoData = {};
    if (req.file) {
      fotoData = {
        foto: req.file.path,
        fotoPublicId: req.file.filename
      };
    }

    const struktur = new Struktur({
      nama,
      jabatan,
      parent: parent || null,
      level: level || 0,
      urutan: urutan || 0,
      kategori: kategori || 'kepengurusan',
      periode,
      deskripsi,
      noHp,
      email,
      isPublished: isPublished !== false,
      ...fotoData
    });

    await struktur.save();
    await struktur.populate('parent', 'nama jabatan');

    res.status(201).json({
      success: true,
      message: 'Struktur berhasil ditambahkan',
      data: struktur
    });
  } catch (error) {
    console.error('Create struktur error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Update struktur
 * @route   PUT /api/struktur/:id
 * @access  Private (admin/editor)
 */
exports.updateStruktur = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    let struktur = await Struktur.findById(req.params.id);

    if (!struktur) {
      return res.status(404).json({
        success: false,
        message: 'Struktur tidak ditemukan'
      });
    }

    // Handle foto update
    if (req.file) {
      if (struktur.fotoPublicId) {
        await deleteFromCloudinary(struktur.fotoPublicId);
      }
      req.body.foto = req.file.path;
      req.body.fotoPublicId = req.file.filename;
    }

    struktur = await Struktur.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('parent', 'nama jabatan');

    res.json({
      success: true,
      message: 'Struktur berhasil diperbarui',
      data: struktur
    });
  } catch (error) {
    console.error('Update struktur error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Delete struktur
 * @route   DELETE /api/struktur/:id
 * @access  Private (admin only)
 */
exports.deleteStruktur = async (req, res) => {
  try {
    const struktur = await Struktur.findById(req.params.id);

    if (!struktur) {
      return res.status(404).json({
        success: false,
        message: 'Struktur tidak ditemukan'
      });
    }

    // Check if this struktur has children
    const children = await Struktur.countDocuments({ parent: req.params.id });
    if (children > 0) {
      return res.status(400).json({
        success: false,
        message: 'Tidak dapat menghapus struktur yang memiliki sub-struktur. Hapus sub-struktur terlebih dahulu.'
      });
    }

    // Delete foto
    if (struktur.fotoPublicId) {
      await deleteFromCloudinary(struktur.fotoPublicId);
    }

    await struktur.deleteOne();

    res.json({
      success: true,
      message: 'Struktur berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete struktur error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get struktur by kategori
 * @route   GET /api/struktur/kategori/:kategori
 * @access  Public
 */
exports.getByKategori = async (req, res) => {
  try {
    const struktur = await Struktur.getByKategori(req.params.kategori);

    res.json({
      success: true,
      data: struktur
    });
  } catch (error) {
    console.error('Get by kategori error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Reorder struktur
 * @route   PUT /api/struktur/reorder
 * @access  Private (admin only)
 */
exports.reorderStruktur = async (req, res) => {
  try {
    const { items } = req.body; // Array of { id, urutan, level }

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items array diperlukan'
      });
    }

    // Update all items
    const bulkOps = items.map(item => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { urutan: item.urutan, level: item.level || 0 } }
      }
    }));

    await Struktur.bulkWrite(bulkOps);

    const updatedStruktur = await Struktur.find()
      .sort({ level: 1, urutan: 1 });

    res.json({
      success: true,
      message: 'Urutan struktur berhasil diperbarui',
      data: updatedStruktur
    });
  } catch (error) {
    console.error('Reorder struktur error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

