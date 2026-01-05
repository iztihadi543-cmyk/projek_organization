const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// --- IMPORT ROUTES ---
const userRoutes = require('./routes/userRoutes');
const beritaRoutes = require('./routes/beritaRoutes');
const agendaRoutes = require('./routes/agendaRoutes');
const visiMisiRoutes = require('./routes/vmRoutes'); 
const authRoutes = require('./routes/authRoutes'); // <-- 1. TAMBAHAN IMPORT

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// --- LOG DEBUGGING (Cek siapa yang bikin error) ---
console.log("Cek User Route:", userRoutes ? "✅ Ada" : "❌ KOSONG");
console.log("Cek Berita Route:", beritaRoutes ? "✅ Ada" : "❌ KOSONG");
console.log("Cek Agenda Route:", agendaRoutes ? "✅ Ada" : "❌ KOSONG");
console.log("Cek VisiMisi Route:", visiMisiRoutes ? "✅ Ada" : "❌ KOSONG");
console.log("Cek Auth Route:", authRoutes ? "✅ Ada" : "❌ KOSONG"); // <-- 2. TAMBAHAN CEK

// --- GUNAKAN ROUTES ---
if (userRoutes) app.use('/api/users', userRoutes);
if (beritaRoutes) app.use('/api/berita', beritaRoutes);
if (agendaRoutes) app.use('/api/agenda', agendaRoutes);
if (visiMisiRoutes) app.use('/api/visimisi', visiMisiRoutes);

// <-- 3. TAMBAHAN ROUTES LOGIN
if (authRoutes) {
    app.use('/api/auth', authRoutes);
} else {
    console.error("❌ Auth Routes Gagal Dimuat (File mungkin kosong atau salah path)");
}

module.exports = app;