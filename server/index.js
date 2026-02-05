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

// --- PENTING: Import Model Utama ---
// Ini memancing Sequelize untuk mengenali tabel sebelum dipanggil
const User = require('./models/User');
// Jika Anda punya file models/Booking.js, uncomment baris bawah ini:
// const Booking = require('./models/Booking'); 

const app = express();

// --- SETTING CORS ANTI-GAGAL ---
app.use(cors({
    origin: true, // Bolehkah semua domain? YA.
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Pastikan Pre-flight request (OPTIONS) dijawab "OK"
app.options('*', cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('✅ Server King Gym Berjalan Normal!');
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/classes', classRoutes); 
app.use('/api/users', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;