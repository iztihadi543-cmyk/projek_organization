/**
 * Galeri Model
 * Model untuk galeri foto/video organisasi
 */

const mongoose = require('mongoose');

const galeriSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Judul galeri wajib diisi'],
    trim: true,
    maxlength: [200, 'Judul maksimal 200 karakter']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Deskripsi maksimal 500 karakter']
  },
  imageUrl: {
    type: String,
    required: [true, 'URL gambar wajib diisi']
  },
  imagePublicId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['photo', 'video'],
    default: 'photo'
  },
  videoUrl: {
    type: String,
    default: null
  },
  category: {
    type: String,
    enum: ['kegiatan', 'latihan', 'acara', 'lomba', 'pendidikan', '的其他'],
    default: 'kegiatan'
  },
  tags: [{
    type: String,
    trim: true
  }],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index untuk optimasi query
galeriSchema.index({ type: 1 });
galeriSchema.index({ category: 1 });
galeriSchema.index({ isPublished: 1 });
galeriSchema.index({ createdAt: -1 });
galeriSchema.index({ tags: 1 });

// Virtual untuk formatted date
galeriSchema.virtual('formattedDate').get(function() {
  return new Date(this.createdAt).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Static: Get photos
galeriSchema.statics.getPhotos = function(options = {}) {
  return this.find({ 
    type: 'photo', 
    isPublished: true 
  })
    .sort({ createdAt: -1 })
    .limit(options.limit || 20)
    .skip(options.skip || 0)
    .populate('uploadedBy', 'username');
};

// Static: Get videos
galeriSchema.statics.getVideos = function(options = {}) {
  return this.find({ 
    type: 'video', 
    isPublished: true 
  })
    .sort({ createdAt: -1 })
    .limit(options.limit || 20)
    .skip(options.skip || 0)
    .populate('uploadedBy', 'username');
};

// Static: Get by category
galeriSchema.statics.getByCategory = function(category, options = {}) {
  return this.find({ 
    category, 
    isPublished: true 
  })
    .sort({ createdAt: -1 })
    .limit(options.limit || 20)
    .skip(options.skip || 0);
};

// Static: Get gallery stats
galeriSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    { $match: { isPublished: true } },
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 }
      }
    }
  ]);
  
  const result = {
    photos: 0,
    videos: 0,
    total: 0
  };
  
  stats.forEach(stat => {
    if (stat._id === 'photo') result.photos = stat.count;
    if (stat._id === 'video') result.videos = stat.count;
    result.total += stat.count;
  });
  
  return result;
};

module.exports = mongoose.model('Galeri', galeriSchema);

