const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Pastikan path ini sesuai dengan file db.js Anda
const path = require('path');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes'); 
const bookingRoutes = require('./routes/bookingRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Konfigurasi CORS
app.use(cors({
    origin: [
        "http://localhost:5173",                
        "https://king-gym-app.vercel.app"
    ],
    credentials: true
}));

app.use(express.json());

// --- ROUTE TEST DATABASE (INI YANG KITA BUTUHKAN) ---
app.get('/test-db', async (req, res) => {
    try {
        // Cek koneksi
        await db.authenticate();
        res.json({
            status: 'success',
            message: '✅ BERHASIL KONEK KE TIDB CLOUD!',
            config: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                db: process.env.DB_NAME
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: '❌ GAGAL KONEK DATABASE',
            error: error.message
        });
    }
});

// --- Route Utama (Supaya tidak Cannot GET /) ---
app.get('/', (req, res) => {
    res.send('✅ Server King Gym Berjalan Normal!');
});

// --- Pasang Routes Aplikasi ---
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/classes', classRoutes); 
app.use('/api/users', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Server Listen ---
if (require.main === module) {
    app.listen(5000, () => {
        console.log('🚀 Server running on port 5000');
    });
}

module.exports = app;