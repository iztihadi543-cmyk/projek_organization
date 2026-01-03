/**
 * Berita Model
 * Model untuk berita/artikel organisasi
 */

const mongoose = require('mongoose');

const beritaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Judul berita wajib diisi'],
    trim: true,
    maxlength: [200, 'Judul maksimal 200 karakter']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Konten berita wajib diisi']
  },
  excerpt: {
    type: String,
    maxlength: [500, 'Excerpt maksimal 500 karakter']
  },
  image: {
    type: String,
    default: null
  },
  imagePublicId: {
    type: String,
    default: null
  },
  category: {
    type: String,
    enum: ['berita', 'pengumuman', 'artikel', 'liputan'],
    default: 'berita'
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publishedAt: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index untuk optimasi query
beritaSchema.index({ slug: 1 });
beritaSchema.index({ status: 1, publishedAt: -1 });
beritaSchema.index({ category: 1 });
beritaSchema.index({ tags: 1 });
beritaSchema.index({ author: 1 });

// Virtual untuk formatted date
beritaSchema.virtual('formattedDate').get(function() {
  if (this.publishedAt) {
    return new Date(this.publishedAt).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  return new Date(this.createdAt).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Middleware: Generate slug otomatis dari title sebelum save
beritaSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Hapus karakter khusus
      .replace(/\s+/g, '-') // Ganti spasi dengan dash
      .replace(/-+/g, '-') // Hapus dash duplikat
      .trim();
    
    // Tambahkan timestamp untuk memastikan uniqueness
    this.slug = `${this.slug}-${Date.now()}`;
  }
  next();
});

// Method untuk publish
beritaSchema.methods.publish = function() {
  this.status = 'published';
  this.publishedAt = new Date();
  return this.save();
};

// Method untuk unpublish
beritaSchema.methods.unpublish = function() {
  this.status = 'draft';
  return this.save();
};

// Static: Get published news
beritaSchema.statics.getPublished = function(options = {}) {
  return this.find({ status: 'published' })
    .sort({ publishedAt: -1 })
    .limit(options.limit || 10)
    .skip(options.skip || 0)
    .populate('author', 'username avatar');
};

// Static: Get featured news
beritaSchema.statics.getFeatured = function(limit = 3) {
  return this.find({ 
    status: 'published', 
    isFeatured: true 
  })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .populate('author', 'username avatar');
};

module.exports = mongoose.model('Berita', beritaSchema);

