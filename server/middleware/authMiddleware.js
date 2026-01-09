const jwt = require('jsonwebtoken');

// --- PENTING: KUNCI INI HARUS SAMA PERSIS DENGAN DI AUTHCONTROLLER.JS ---
const JWT_SECRET = 'RAHASIA_NEGARA'; 

// 1. Fungsi Cek Token
const verifyToken = (req, res, next) => {
    // Ambil token dari Header (Format: Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    // Jika token tidak ada
    if (!token) {
        return res.status(401).json({ message: "Akses Ditolak! Anda belum login." });
    }

    // Verifikasi Token
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Sesi Kadaluarsa/Token Tidak Valid!" });
        }
        req.user = user; // Simpan data user ke request
        next();
    });
};

// 2. Fungsi Cek Admin (Memanggil verifyToken dulu)
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // Cek Role (Support huruf besar/kecil)
        if (req.user.role === 'admin' || req.user.role === 'ADMIN') {
            next(); // Boleh lewat
        } else {
            return res.status(403).json({ message: "DILARANG! Area Khusus Admin." });
        }
    });
};

module.exports = { verifyToken, verifyAdmin };