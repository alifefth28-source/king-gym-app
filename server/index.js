const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const User = require('./models/User');
const Class = require('./models/Class.js');     
const Booking = require('./models/Booking'); 
const authRoutes = require('./routes/authRoutes');
const classRoutes = require('./routes/classRoutes'); 
const bookingRoutes = require('./routes/bookingRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const path = require('path');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(cors({
    origin: [
        "http://localhost:5173",                
        "https://king-gym-app.vercel.app"       
    ],
    credentials: true
}));
app.use(express.json());
app.use('/api/bookings', bookingRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', userRoutes);


sequelize.sync() 
    .then(() => {
        console.log("✅ Database Lengkap (Users, Classes, Bookings) Siap!");
        app.listen(5000, () => {
            console.log('🚀 Server running on port 5000');
        });
    })
    .catch(err => {
        console.error("❌ Gagal Konek Database:", err);
    });

module.exports = app;