const mongoose = require('mongoose');

const beritaSchema = mongoose.Schema({
  judul: {
    type: String,
    required: [true, 'Judul berita wajib diisi'],
  },
  konten: {
    type: String,
    required: [true, 'Isi berita wajib diisi'],
  },
  penulis: {
    type: String,
    required: [true, 'Penulis wajib diisi'],
  },
  gambar: {
    type: String, 
    default: 'https://placehold.co/600x400?text=No+Image', // Placeholder jika tidak ada gambar
  },
}, { timestamps: true });

module.exports = mongoose.model('Berita', beritaSchema);