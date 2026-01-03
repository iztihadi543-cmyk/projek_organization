const mongoose = require('mongoose');

const agendaSchema = mongoose.Schema({
  namaKegiatan: {
    type: String,
    required: [true, 'Nama kegiatan wajib diisi'],
  },
  deskripsi: {
    type: String,
    required: [true, 'Deskripsi wajib diisi'],
  },
  lokasi: {
    type: String,
    required: [true, 'Lokasi wajib diisi'],
  },
  tanggalMulai: {
    type: Date,
    required: [true, 'Tanggal mulai wajib diisi'],
  },
  status: {
    type: String,
    enum: ['akan datang', 'berlangsung', 'selesai'],
    default: 'akan datang',
  },
}, { timestamps: true });

module.exports = mongoose.model('Agenda', agendaSchema);