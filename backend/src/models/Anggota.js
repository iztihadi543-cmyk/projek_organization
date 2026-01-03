/**
 * Anggota Model
 * Model untuk anggota/organisasi Pramuka
 */

const mongoose = require('mongoose');

const anggotaSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, 'Nama anggota wajib diisi'],
    trim: true,
    maxlength: [100, 'Nama maksimal 100 karakter']
  },
  nickname: {
    type: String,
    trim: true,
    maxlength: [50, 'Nama panggilan maksimal 50 karakter']
  },
  foto: {
    type: String,
    default: null
  },
  fotoPublicId: {
    type: String,
    default: null
  },
  jabatan: {
    type: String,
    required: [true, 'Jabatan wajib diisi'],
    trim: true
  },
  kategori: {
    type: String,
    enum: ['pengurus', 'anggota', ' Alumni', 'pendamping'],
    default: 'anggota'
  },
  tingkat: {
    type: String,
    enum: ['Siaga', 'Penggalang', 'Penegak', 'Pandega', 'dewasa'],
    default: 'dewasa'
  },
  unit: {
    type: String,
    trim: true,
    default: ''
  },
  noHp: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  alamat: {
    type: String,
    trim: true
  },
  ttl: {
    tempat: { type: String, trim: true },
    tanggal: { type: Date }
  },
  periodeMasuk: {
    type: Number
  },
  status: {
    type: String,
    enum: ['aktif', 'nonaktif', 'alumni'],
    default: 'aktif'
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  urutan: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index untuk optimasi query
anggotaSchema.index({ kategori: 1 });
anggotaSchema.index({ status: 1 });
anggotaSchema.index({ urutan: 1 });
anggotaSchema.index({ isPublished: 1, kategori: 1 });

// Virtual untuk formatted birth date
anggotaSchema.virtual('tanggalLahir').get(function() {
  if (this.ttl && this.ttl.tanggal) {
    return new Date(this.ttl.tanggal).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  return null;
});

// Virtual untuk age
anggotaSchema.virtual('usia').get(function() {
  if (this.ttl && this.ttl.tanggal) {
    const today = new Date();
    const birthDate = new Date(this.ttl.tanggal);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  return null;
});

// Static: Get active members
anggotaSchema.statics.getActive = function(options = {}) {
  return this.find({ 
    status: 'aktif', 
    isPublished: true 
  })
    .sort({ urutan: 1, nama: 1 })
    .limit(options.limit || 100)
    .skip(options.skip || 0);
};

// Static: Get by kategori
anggotaSchema.statics.getByKategori = function(kategori, options = {}) {
  return this.find({ 
    kategori, 
    isPublished: true 
  })
    .sort({ urutan: 1 })
    .limit(options.limit || 100)
    .skip(options.skip || 0);
};

// Static: Get pengurus (organization structure)
anggotaSchema.statics.getPengurus = function() {
  return this.find({ 
    kategori: 'pengurus', 
    isPublished: true 
  })
    .sort({ urutan: 1 });
};

// Static: Get member stats
anggotaSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    { $match: { isPublished: true } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  
  const result = {
    aktif: 0,
    nonaktif: 0,
    alumni: 0,
    total: 0
  };
  
  stats.forEach(stat => {
    if (result.hasOwnProperty(stat._id)) {
      result[stat._id] = stat.count;
    }
    result.total += stat.count;
  });
  
  return result;
};

module.exports = mongoose.model('Anggota', anggotaSchema);

