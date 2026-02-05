const express = require('express');
const cors = require('cors'); // PENTING: Tetap pakai library cors
const db = require('./config/db'); 
const path = require('path');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes'); 
const bookingRoutes = require('./routes/bookingRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const userRoutes = require('./routes/userRoutes');

// --- 1. IMPORT SEMUA MODEL (JANGAN DI-COMMENT!) ---
const User = require('./models/User');
const Class = require('./models/Class');     // Pastikan file models/Class.js ada
const Booking = require('./models/Booking'); // Pastikan file models/Booking.js ada

// --- 2. DEFINISI RELASI (ASSOCIATIONS) MANUAL ---
// Ini penting supaya saat Controller memanggil "include: [Class]", server tidak crash.
User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Class.hasMany(Booking, { foreignKey: 'class_id' });
Booking.belongsTo(Class, { foreignKey: 'class_id' });

const app = express();

// --- 3. CORS WHITELIST (Paling Aman untuk Vercel) ---
const allowedOrigins = [
    "https://king-gym-app.vercel.app", 
    "http://localhost:5173",
    "https://king-gym-p2ipsya6b-radjas-projects-b03780ee.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        // Izinkan request server-to-server (tanpa origin) atau yang ada di whitelist
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Blocked by CORS'));
        }
    },
    credentials: true, // Wajib true agar Token Authorization bisa masuk
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Handle Preflight Request (Penting untuk Authorization header)
app.options('*', cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('✅ Server King Gym Berjalan Normal (Relasi Fixed)!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/classes', classRoutes); 
app.use('/api/users', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sinkronisasi Database (Hati-hati, jangan gunakan force: true di production)
// db.sync({ alter: true }).then(() => console.log("Database Synced"));

module.exports = app;