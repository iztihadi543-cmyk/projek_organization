const mongoose = require('mongoose');

const galeriSchema = mongoose.Schema({
  judul: {
    type: String,
    required: [true, 'Judul foto wajib diisi'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Link URL gambar wajib diisi'],
  },
  deskripsi: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Galeri', galeriSchema);