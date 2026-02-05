const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2'); 
const pg = require('pg'); // Opsional, jaga-jaga jika Vercel bingung

// 1. Ambil DATABASE_URL dari environment
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('❌ DATABASE_URL tidak ditemukan di environment variables!');
}

// 2. Setup Sequelize dengan konfigurasi yang lebih aman
const db = new Sequelize(connectionString, {
    dialect: 'mysql',
    dialectModule: mysql2, // Wajib untuk Vercel
    logging: false, 
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}); // <--- TANDA TITIK KOMA INI SANGAT PENTING!

// 3. Cek koneksi
console.log(`📡 Mencoba konek ke DB...`);

// Export dulu baru authenticate (agar tidak memblokir import)
module.exports = db;