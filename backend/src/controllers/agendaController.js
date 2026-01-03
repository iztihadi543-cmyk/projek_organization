/**
 * Agenda Controller
 * CRUD operations untuk agenda/kegiatan
 */

const Agenda = require('../models/Agenda');
const { validationResult } = require('express-validator');
const { deleteFromCloudinary } = require('../config/cloudinary');

/**
 * @desc    Get all agenda
 * @route   GET /api/agenda
 * @access  Public
 */
exports.getAllAgenda = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10,
      status,
      category,
      upcoming
    } = req.query;

    const query = {};

    // Public hanya bisa see published
    if (!req.user || (req.user.role === 'viewer')) {
      query.isPublished = true;
      query.status = { $ne: 'cancelled' };
    }

    if (status && req.user && (req.user.role === 'admin' || req.user.role === 'editor')) {
      query.status = status;
    }

    if (category) query.category = category;
    
    if (upcoming === 'true') {
      query.date = { $gte: new Date() };
      query.status = { $ne: 'cancelled' };
    }

    const agenda = await Agenda.find(query)
      .sort({ date: 1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('createdBy', 'username');

    const total = await Agenda.countDocuments(query);

    res.json({
      success: true,
      data: agenda,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get all agenda error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get single agenda by ID
 * @route   GET /api/agenda/:id
 * @access  Public
 */
exports.getAgendaById = async (req, res) => {
  try {
    const agenda = await Agenda.findById(req.params.id)
      .populate('createdBy', 'username');

    if (!agenda) {
      return res.status(404).json({
        success: false,
        message: 'Agenda tidak ditemukan'
      });
    }

    res.json({
      success: true,
      data: agenda
    });
  } catch (error) {
    console.error('Get agenda by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Create agenda
 * @route   POST /api/agenda
 * @access  Private (admin/editor)
 */
exports.createAgenda = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { 
      title, description, date, endDate, location, 
      organizer, category, isPublished, maxParticipants 
    } = req.body;

    // Handle image upload
    let imageData = {};
    if (req.file) {
      imageData = {
        image: req.file.path,
        imagePublicId: req.file.filename
      };
    }

    const agenda = new Agenda({
      title,
      description,
      date,
      endDate,
      location,
      organizer: organizer || 'Pramuka',
      category: category || 'acara',
      isPublished: isPublished || false,
      maxParticipants,
      createdBy: req.user._id,
      ...imageData
    });

    await agenda.save();
    await agenda.populate('createdBy', 'username');

    res.status(201).json({
      success: true,
      message: 'Agenda berhasil dibuat',
      data: agenda
    });
  } catch (error) {
    console.error('Create agenda error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error saat membuat agenda'
    });
  }
};

/**
 * @desc    Update agenda
 * @route   PUT /api/agenda/:id
 * @access  Private (admin/editor)
 */
exports.updateAgenda = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    let agenda = await Agenda.findById(req.params.id);

    if (!agenda) {
      return res.status(404).json({
        success: false,
        message: 'Agenda tidak ditemukan'
      });
    }

    // Handle image update
    if (req.file) {
      if (agenda.imagePublicId) {
        await deleteFromCloudinary(agenda.imagePublicId);
      }
      req.body.image = req.file.path;
      req.body.imagePublicId = req.file.filename;
    }

    agenda = await Agenda.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('createdBy', 'username');

    res.json({
      success: true,
      message: 'Agenda berhasil diperbarui',
      data: agenda
    });
  } catch (error) {
    console.error('Update agenda error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Delete agenda
 * @route   DELETE /api/agenda/:id
 * @access  Private (admin only)
 */
exports.deleteAgenda = async (req, res) => {
  try {
    const agenda = await Agenda.findById(req.params.id);

    if (!agenda) {
      return res.status(404).json({
        success: false,
        message: 'Agenda tidak ditemukan'
      });
    }

    // Delete image
    if (agenda.imagePublicId) {
      await deleteFromCloudinary(agenda.imagePublicId);
    }

    await agenda.deleteOne();

    res.json({
      success: true,
      message: 'Agenda berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete agenda error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get upcoming agenda
 * @route   GET /api/agenda/upcoming
 * @access  Public
 */
exports.getUpcomingAgenda = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const agenda = await Agenda.getUpcoming({ limit: parseInt(limit) });

    res.json({
      success: true,
      data: agenda
    });
  } catch (error) {
    console.error('Get upcoming agenda error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Toggle publish status
 * @route   PUT /api/agenda/:id/toggle-publish
 * @access  Private (admin/editor)
 */
exports.togglePublish = async (req, res) => {
  try {
    const agenda = await Agenda.findById(req.params.id);

    if (!agenda) {
      return res.status(404).json({
        success: false,
        message: 'Agenda tidak ditemukan'
      });
    }

    agenda.isPublished = !agenda.isPublished;
    await agenda.save();

    res.json({
      success: true,
      message: agenda.isPublished ? 'Agenda dipublikasikan' : 'Agenda disembunyikan',
      data: agenda
    });
  } catch (error) {
    console.error('Toggle publish error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

