// File: backend/src/controllers/visiMisiController.js
const VisiMisi = require('../models/visiMisiModel');

// @desc    Ambil Data Visi Misi
// @route   GET /api/visimisi
const getVisiMisi = async (req, res) => {
  try {
    let data = await VisiMisi.findOne();
    
    // Kalau belum ada data, buat default
    if (!data) {
      data = await VisiMisi.create({
        visi: "Visi Default",
        misi: [],
        programKerja: { pendek: [], menengah: [], panjang: [] }
      });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Visi Misi
// @route   PUT /api/visimisi
const updateVisiMisi = async (req, res) => {
  try {
    const updatedData = await VisiMisi.findOneAndUpdate(
      {}, 
      req.body, 
      { new: true, upsert: true }
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVisiMisi, updateVisiMisi };