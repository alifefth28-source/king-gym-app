const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const multer = require('multer');

// --- SETUP CLOUDINARY ---
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Konfigurasi menggunakan nilai dari .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Setup Multer Storage agar langsung menembak ke Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'king-gym-profiles', // Nama folder yang akan otomatis terbuat di Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }] // Opsional: otomatis kompres/resize
    },
});

const upload = multer({ storage: storage });
// ------------------------

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', authController.getAllUsers);
router.get('/me', verifyToken, authController.getMe);
router.post('/scan', authController.scanMember);

// Route Upload Foto
router.post('/upload-photo', verifyToken, upload.single('photo'), authController.uploadPhoto); 

module.exports = router;