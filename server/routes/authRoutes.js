const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// Import Multer & Cloudinary
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Konfigurasi Cloudinary menggunakan .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Setup Storage menembak ke Cloudinary (BUKAN ke disk lokal)
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'king-gym-profiles',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
    },
});

const upload = multer({ storage: storage });

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', authController.getAllUsers);
router.get('/me', verifyToken, authController.getMe);
router.post('/scan', authController.scanMember);

// Rute Upload Foto
router.post('/upload-photo', verifyToken, upload.single('photo'), authController.uploadPhoto); 

module.exports = router;