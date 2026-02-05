const express = require('express');
const cors = require('cors');
const db = require('./config/db'); 
const path = require('path');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes'); 
const bookingRoutes = require('./routes/bookingRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const userRoutes = require('./routes/userRoutes');

// Import Models (WAJIB ADA SUPAYA TABEL DIBUAT)
const User = require('./models/User');
// Import model lain jika ada, misal:
// const Class = require('./models/Class');

const app = express();

app.use(cors({
    origin: [
        "https://king-gym-app.vercel.app", 
        "http://localhost:5173",
        "https://king-gym-p2ipsya6b-radjas-projects-b03780ee.vercel.app"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// --- ROUTE TEST DATABASE & BUAT TABEL ---
app.get('/test-db', async (req, res) => {
    try {
        // 1. Cek Koneksi
        await db.authenticate();
        
        // 2. Cek apakah tabel Users sudah ada?
        // sync({ alter: true }) akan membuat tabel jika belum ada
        // atau memperbarui kolom jika ada perubahan
        await db.sync({ alter: true }); 

        res.json({
            status: 'success',
            message: '✅ BERHASIL KONEK & TABEL SUDAH DISINKRONISASI!',
            tables_created: true,
            config: {
                host: process.env.DB_HOST,
                db: process.env.DB_NAME
            }
        });
    } catch (error) {
        console.error("DB Error:", error);
        res.status(500).json({
            status: 'error',
            message: '❌ GAGAL KONEK / SYNC DATABASE',
            error: error.message
        });
    }
});

app.get('/', (req, res) => {
    res.send('✅ Server King Gym Berjalan Normal! (v2)');
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/classes', classRoutes); 
app.use('/api/users', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- SYNC DATABASE SAAT SERVER START ---
// KITA MATIKAN INI SUPAYA LEBIH CEPAT & AMAN (Karena tabel sudah ada)
/*
db.sync({ alter: true })
    .then(() => {
        console.log("✅ Database & Tabel Siap!");
    })
    .catch((err) => {
        console.error("❌ Gagal Sync Database:", err);
    });
*/ 
// Cukup beri tanda /* di awal dan */ di akhir blok ini

module.exports = app;