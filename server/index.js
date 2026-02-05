const express = require('express');
const db = require('./config/db'); 
const path = require('path');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes'); 
const bookingRoutes = require('./routes/bookingRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const userRoutes = require('./routes/userRoutes');

// Import Model
const User = require('./models/User');

const app = express();

// --- 🔥 JURUS FINAL CORS (Revisi: Echo Origin) ---
app.use((req, res, next) => {
    // Ambil alamat si penanya (Frontend)
    const origin = req.headers.origin;
    
    // Jika ada yang bertanya, kita izinkan dia secara spesifik
    // (Ini menghindari konflik antara '*' dan Credentials)
    if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Izinkan method standar
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Izinkan header penting (Authorization untuk Token)
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    
    // Izinkan kredensial (Cookie/Token)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // PENTING: Jika request hanya "Cek Ombak" (OPTIONS), langsung jawab OK.
    if (req.method === 'OPTIONS') {
        return res.status(200).send('OK');
    }

    next();
});
// -----------------------------------------------------

app.use(express.json());

app.get('/', (req, res) => {
    res.send('✅ Server King Gym Berjalan Normal (Echo Mode)!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/classes', classRoutes); 
app.use('/api/users', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;