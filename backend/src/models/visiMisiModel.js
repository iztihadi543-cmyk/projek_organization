// File: backend/src/models/visiMisiModel.js
const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  tanggal: { type: String, required: true },
  sasaran: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Terlaksana', 'Belum Terlaksana', 'Tidak Terlaksana'], 
    default: 'Belum Terlaksana' 
  }
});

const visiMisiSchema = new mongoose.Schema({
  visi: { type: String, default: "Visi belum diatur." },
  misi: [{
    title: String,
    description: String,
    icon: String
  }],
  programKerja: {
    pendek: [programSchema],
    menengah: [programSchema],
    panjang: [programSchema]
  }
}, { timestamps: true });

module.exports = mongoose.model('VisiMisi', visiMisiSchema);