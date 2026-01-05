const express = require('express');
const router = express.Router();

// --- CONTOH ROUTE SEMENTARA ---
// (Nanti bisa diganti dengan controller asli)

// GET /api/users
router.get('/', (req, res) => {
    res.json({ message: "User route berhasil diakses!" });
});

// PENTING: Jangan lupa baris ini
module.exports = router;