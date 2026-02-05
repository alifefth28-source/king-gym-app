const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); 
const User = require('./models/User');
const Class = require('./models/Class.js');     
const Booking = require('./models/Booking'); 
const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes'); 
const bookingRoutes = require('./routes/bookingRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",                
        "https://king-gym-app.vercel.app"
    ],
    credentials: true
}));

app.use(express.json());

// --- BAGIAN BARU: Route Utama (Supaya tidak 404 di Logs) ---
app.get('/', (req, res) => {
    res.send('✅ Backend King Gym is Running!');
});

// --- BAGIAN BARU: Route Cek Database Manual ---
app.get('/test-db', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({
            status: 'success',
            message: '✅ BERHASIL KONEK DATABASE KE TIDB CLOUD!',
            host: sequelize.config.host,
            database: sequelize.config.database
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: '❌ GAGAL KONEK DATABASE',
            details: error.message
        });
    }
});

// --- Route Aplikasi ---
app.use('/api/bookings', bookingRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', userRoutes);

// --- Server Setup ---
// Kita coba konek DB saat start, tapi jangan memblokir export app
sequelize.authenticate() 
    .then(() => console.log("✅ Database Connection Established (Background Check)"))
    .catch(err => console.error("❌ Database Connection Failed (Background Check):", err));

// Logic agar jalan di Localhost (Port 5000) & Vercel
if (require.main === module) {
    app.listen(5000, () => {
        console.log('🚀 Server running on port 5000');
    });
}

module.exports = app;