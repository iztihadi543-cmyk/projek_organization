/**
 * Agenda Model
 * Model untuk agenda/kegiatan organisasi
 */

const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Judul agenda wajib diisi'],
    trim: true,
    maxlength: [200, 'Judul maksimal 200 karakter']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Deskripsi agenda wajib diisi']
  },
  image: {
    type: String,
    default: null
  },
  imagePublicId: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    required: [true, 'Tanggal agenda wajib diisi']
  },
  endDate: {
    type: Date,
    default: null
  },
  location: {
    type: String,
    required: [true, 'Lokasi agenda wajib diisi'],
    trim: true
  },
  organizer: {
    type: String,
    trim: true,
    default: 'Pramuka'
  },
  category: {
    type: String,
    enum: ['latihan', 'pelatihan', 'acara', 'rakor', 'lomba', '的其他'],
    default: 'acara'
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  participants: {
    type: Number,
    default: 0
  },
  maxParticipants: {
    type: Number,
    default: null
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index untuk optimasi query
agendaSchema.index({ slug: 1 });
agendaSchema.index({ date: 1 });
agendaSchema.index({ status: 1 });
agendaSchema.index({ category: 1 });
agendaSchema.index({ isPublished: 1, date: 1 });

// Virtual untuk formatted date
agendaSchema.virtual('formattedDate').get(function() {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(this.date).toLocaleDateString('id-ID', options);
});

agendaSchema.virtual('formattedTime').get(function() {
  return new Date(this.date).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual untuk check apakah event sudah passed
agendaSchema.virtual('isPast').get(function() {
  return new Date(this.date) < new Date();
});

// Middleware: Generate slug otomatis
agendaSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    this.slug = `${this.slug}-${Date.now()}`;
  }
  
  // Auto update status berdasarkan tanggal
  if (this.date) {
    const now = new Date();
    const eventDate = new Date(this.date);
    
    if (this.endDate) {
      const endDate = new Date(this.endDate);
      if (now > endDate) {
        this.status = 'completed';
      } else if (now >= eventDate && now <= endDate) {
        this.status = 'ongoing';
      }
    } else {
      if (now > eventDate) {
        this.status = 'completed';
      } else if (now.toDateString() === eventDate.toDateString()) {
        this.status = 'ongoing';
      }
    }
  }
  
  next();
});

// Static: Get upcoming agenda
agendaSchema.statics.getUpcoming = function(options = {}) {
  return this.find({ 
    isPublished: true,
    date: { $gte: new Date() },
    status: { $ne: 'cancelled' }
  })
    .sort({ date: 1 })
    .limit(options.limit || 10)
    .skip(options.skip || 0)
    .populate('createdBy', 'username');
};

// Static: Get agenda by date range
agendaSchema.statics.getByDateRange = function(startDate, endDate) {
  return this.find({
    isPublished: true,
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  }).sort({ date: 1 });
};

module.exports = mongoose.model('Agenda', agendaSchema);

