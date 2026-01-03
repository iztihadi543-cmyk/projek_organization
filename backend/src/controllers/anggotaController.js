/**
 * Anggota Controller
 * CRUD operations untuk anggota organisasi
 */

const Anggota = require('../models/Anggota');
const { validationResult } = require('express-validator');
const { deleteFromCloudinary } = require('../config/cloudinary');

/**
 * @desc    Get all anggota
 * @route   GET /api/anggota
 * @access  Public
 */
exports.getAllAnggota = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20,
      kategori,
      status,
      search,
      tingkat
    } = req.query;

    const query = {};

    // Public hanya bisa see published
    if (!req.user || (req.user.role === 'viewer')) {
      query.isPublished = true;
      query.status = 'aktif';
    }

    if (kategori) query.kategori = kategori;
    if (status && req.user && (req.user.role === 'admin' || req.user.role === 'editor')) {
      query.status = status;
    }
    if (tingkat) query.tingkat = tingkat;
    
    if (search) {
      query.$or = [
        { nama: { $regex: search, $options: 'i' } },
        { nickname: { $regex: search, $options: 'i' } },
        { jabatan: { $regex: search, $options: 'i' } }
      ];
    }

    const anggota = await Anggota.find(query)
      .sort({ urutan: 1, nama: 1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Anggota.countDocuments(query);

    res.json({
      success: true,
      data: anggota,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get all anggota error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get single anggota by ID
 * @route   GET /api/anggota/:id
 * @access  Public
 */
exports.getAnggotaById = async (req, res) => {
  try {
    const anggota = await Anggota.findById(req.params.id);

    if (!anggota) {
      return res.status(404).json({
        success: false,
        message: 'Anggota tidak ditemukan'
      });
    }

    res.json({
      success: true,
      data: anggota
    });
  } catch (error) {
    console.error('Get anggota by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Create anggota
 * @route   POST /api/anggota
 * @access  Private (admin/editor)
 */
exports.createAnggota = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { 
      nama, nickname, jabatan, kategori, tingkat, 
      unit, noHp, email, alamat, ttl, periodeMasuk, 
      status, urutan, isPublished 
    } = req.body;

    // Handle foto upload
    let fotoData = {};
    if (req.file) {
      fotoData = {
        foto: req.file.path,
        fotoPublicId: req.file.filename
      };
    }

    const anggota = new Anggota({
      nama,
      nickname,
      jabatan,
      kategori: kategori || 'anggota',
      tingkat: tingkat || 'dewasa',
      unit,
      noHp,
      email,
      alamat,
      ttl: ttl ? {
        tempat: ttl.tempat,
        tanggal: ttl.tanggal ? new Date(ttl.tanggal) : null
      } : undefined,
      periodeMasuk: periodeMasuk ? parseInt(periodeMasuk) : undefined,
      status: status || 'aktif',
      urutan: urutan ? parseInt(urutan) : 0,
      isPublished: isPublished !== false,
      uploadedBy: req.user._id,
      ...fotoData
    });

    await anggota.save();

    res.status(201).json({
      success: true,
      message: 'Anggota berhasil ditambahkan',
      data: anggota
    });
  } catch (error) {
    console.error('Create anggota error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Update anggota
 * @route   PUT /api/anggota/:id
 * @access  Private (admin/editor)
 */
exports.updateAnggota = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    let anggota = await Anggota.findById(req.params.id);

    if (!anggota) {
      return res.status(404).json({
        success: false,
        message: 'Anggota tidak ditemukan'
      });
    }

    // Handle foto update
    if (req.file) {
      if (anggota.fotoPublicId) {
        await deleteFromCloudinary(anggota.fotoPublicId);
      }
      req.body.foto = req.file.path;
      req.body.fotoPublicId = req.file.filename;
    }

    // Handle ttl object
    if (req.body.ttl) {
      req.body.ttl = {
        tempat: req.body.ttl.tempat,
        tanggal: req.body.ttl.tanggal ? new Date(req.body.ttl.tanggal) : null
      };
    }

    anggota = await Anggota.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Anggota berhasil diperbarui',
      data: anggota
    });
  } catch (error) {
    console.error('Update anggota error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Delete anggota
 * @route   DELETE /api/anggota/:id
 * @access  Private (admin only)
 */
exports.deleteAnggota = async (req, res) => {
  try {
    const anggota = await Anggota.findById(req.params.id);

    if (!anggota) {
      return res.status(404).json({
        success: false,
        message: 'Anggota tidak ditemukan'
      });
    }

    // Delete foto
    if (anggota.fotoPublicId) {
      await deleteFromCloudinary(anggota.fotoPublicId);
    }

    await anggota.deleteOne();

    res.json({
      success: true,
      message: 'Anggota berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete anggota error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get active anggota
 * @route   GET /api/anggota/active
 * @access  Public
 */
exports.getActiveAnggota = async (req, res) => {
  try {
    const { limit = 100 } = req.query;
    const anggota = await Anggota.getActive({ limit: parseInt(limit) });

    res.json({
      success: true,
      data: anggota
    });
  } catch (error) {
    console.error('Get active anggota error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get pengurus (organization structure)
 * @route   GET /api/anggota/pengurus
 * @access  Public
 */
exports.getPengurus = async (req, res) => {
  try {
    const anggota = await Anggota.getPengurus();

    res.json({
      success: true,
      data: anggota
    });
  } catch (error) {
    console.error('Get pengurus error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get anggota stats
 * @route   GET /api/anggota/stats
 * @access  Public
 */
exports.getStats = async (req, res) => {
  try {
    const stats = await Anggota.getStats();

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

