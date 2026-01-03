/**
 * Struktur Model
 * Model untuk struktur organisasi Pramuka
 */

const mongoose = require('mongoose');

const strukturSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, 'Nama wajib diisi'],
    trim: true,
    maxlength: [100, 'Nama maksimal 100 karakter']
  },
  jabatan: {
    type: String,
    required: [true, 'Jabatan wajib diisi'],
    trim: true
  },
  foto: {
    type: String,
    default: null
  },
  fotoPublicId: {
    type: String,
    default: null
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Struktur',
    default: null
  },
  level: {
    type: Number,
    default: 0 // 0 = atas, 1 = bawah, dll
  },
  urutan: {
    type: Number,
    default: 0
  },
  kategori: {
    type: String,
    enum: ['pengurus_inti', 'kepengurusan', 'badan_pendidikan', 'badan_usaha', '的其他'],
    default: 'kepengurusan'
  },
  periode: {
    type: String,
    trim: true,
    default: ''
  },
  deskripsi: {
    type: String,
    trim: true
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
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index untuk optimasi query
strukturSchema.index({ parent: 1 });
strukturSchema.index({ level: 1, urutan: 1 });
strukturSchema.index({ kategori: 1 });
strukturSchema.index({ isPublished: 1 });

// Virtual untuk children (sub-struktur)
strukturSchema.virtual('children', {
  ref: 'Struktur',
  localField: '_id',
  foreignField: 'parent'
});

// Static: Get organizational hierarchy
strukturSchema.statics.getHierarchy = async function() {
  const rootItems = await this.find({ 
    parent: null, 
    isPublished: true 
  })
    .sort({ level: 1, urutan: 1 })
    .lean();
  
  // Recursively get children
  const buildTree = async (parentId) => {
    const children = await this.find({ 
      parent: parentId, 
      isPublished: true 
    })
      .sort({ urutan: 1 })
      .lean();
    
    for (const child of children) {
      child.children = await buildTree(child._id);
    }
    
    return children;
  };
  
  for (const item of rootItems) {
    item.children = await buildTree(item._id);
  }
  
  return rootItems;
};

// Static: Get by level
strukturSchema.statics.getByLevel = function(level, options = {}) {
  return this.find({ 
    level, 
    isPublished: true 
  })
    .sort({ urutan: 1 })
    .limit(options.limit || 100);
};

// Static: Get by kategori
strukturSchema.statics.getByKategori = function(kategori) {
  return this.find({ 
    kategori, 
    isPublished: true 
  })
    .sort({ level: 1, urutan: 1 });
};

module.exports = mongoose.model('Struktur', strukturSchema);

