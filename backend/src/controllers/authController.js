const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Fungsi Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'rahasia123', {
    expiresIn: '30d',
  });
};

// @desc    Register User
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User sudah terdaftar' });
    }

    const user = await User.create({ nama, email, password, role });

    if (user) {
      res.status(201).json({
        _id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Data user tidak valid' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login User
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Email atau password salah' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- BAGIAN INI SANGAT PENTING (JANGAN LUPA) ---
module.exports = { registerUser, loginUser };