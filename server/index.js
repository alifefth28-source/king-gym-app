const express = require('express');
const db = require('./config/db'); 
const path = require('path');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes'); 
const bookingRoutes = require('./routes/bookingRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const userRoutes = require('./routes/userRoutes');

// Import Model
const User = require('./models/User');

const app = express();

const whitelist = [
    "https://king-gym-app.vercel.app", 
    "https://king-gym-p2ipsya6b-radjas-projects-b03780ee.vercel.app",
    "http://localhost:5173"
];

// --- 🔥 JURUS FINAL CORS (Revisi: Echo Origin) ---
app.use(cors({
    origin: function (origin, callback) {
        // Izinkan jika origin ada di whitelist atau jika request dari server-to-server (!origin)
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Ditolak oleh kebijakan CORS King Gym'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.options('*', cors());

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