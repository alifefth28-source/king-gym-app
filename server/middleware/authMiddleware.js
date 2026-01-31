const jwt = require('jsonwebtoken');


const JWT_SECRET = 'RAHASIA_NEGARA'; 

// 1. Fungsi Cek Token
const verifyToken = (req, res, next) => {

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

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // Cek Role (Support huruf besar/kecil)
        if (req.user.role === 'admin' || req.user.role === 'ADMIN') {
            next(); 
        } else {
            return res.status(403).json({ message: "DILARANG! Area Khusus Admin." });
        }
    });
};

module.exports = { verifyToken, verifyAdmin };