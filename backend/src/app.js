const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const beritaRoutes = require('./routes/beritaRoutes');
const agendaRoutes = require('./routes/agendaRoutes');
const authRoutes = require('./routes/authRoutes');
const galeriRoutes = require('./routes/galeriRoutes'); // <--- 1. TAMBAHKAN INI

// Use Routes
app.use('/api/berita', beritaRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/galeri', galeriRoutes); // <--- 2. TAMBAHKAN INI

module.exports = app;