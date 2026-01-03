const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  nama: {
    type: String,
    required: [true, 'Nama wajib diisi'],
  },
  email: {
    type: String,
    required: [true, 'Email wajib diisi'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password wajib diisi'],
  },
  role: {
    type: String,
    enum: ['admin', 'editor'],
    default: 'editor',
  },
}, { timestamps: true });

// Enkripsi password sebelum disimpan
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method cek password saat login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);