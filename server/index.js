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

// --- 🔥 JURUS MANUAL CORS (Paste di Paling Atas) ---
app.use((req, res, next) => {
    // 1. Daftar Website yang Diizinkan
    const allowedOrigins = [
        "https://king-gym-app.vercel.app", 
        "http://localhost:5173",
        "https://king-gym-p2ipsya6b-radjas-projects-b03780ee.vercel.app"
    ];
    
    const origin = req.headers.origin;
    
    // 2. Cek Origin & Set Header
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        // Fallback: Izinkan semua untuk debugging (Hati-hati, credentials: true butuh origin spesifik)
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // 3. PENTING: Jika request tipe OPTIONS (Pre-flight), langsung jawab OK & Stop.
    if (req.method === 'OPTIONS') {
        return res.status(200).send('OK');
    }

    next();
});
// -----------------------------------------------------

app.use(express.json());

app.get('/', (req, res) => {
    res.send('✅ Server King Gym Berjalan Normal (Manual CORS Mode)!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/classes', classRoutes); 
app.use('/api/users', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;