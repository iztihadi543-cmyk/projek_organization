const Berita = require('../models/beritaModel');

// 1. Ambil Semua Berita (Urut dari yang terbaru)
const getBerita = async (req, res) => {
  try {
    const berita = await Berita.find().sort({ createdAt: -1 });
    res.status(200).json(berita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Tambah Berita Baru
const createBerita = async (req, res) => {
  try {
    const berita = await Berita.create(req.body);
    res.status(201).json(berita);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 3. Hapus Berita
const deleteBerita = async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);
    if (!berita) {
      return res.status(404).json({ message: 'Berita tidak ditemukan' });
    }
    await berita.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBerita, createBerita, deleteBerita };