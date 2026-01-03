const Galeri = require('../models/galeriModel');

// Ambil Semua Foto
const getGaleri = async (req, res) => {
  try {
    const foto = await Galeri.find().sort({ createdAt: -1 });
    res.status(200).json(foto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tambah Foto Baru
const createGaleri = async (req, res) => {
  try {
    const foto = await Galeri.create(req.body);
    res.status(201).json(foto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Hapus Foto
const deleteGaleri = async (req, res) => {
  try {
    const foto = await Galeri.findById(req.params.id);
    if (!foto) return res.status(404).json({ message: 'Foto tidak ditemukan' });
    
    await foto.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getGaleri, createGaleri, deleteGaleri };