const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2'); 
require('dotenv').config(); // Pastikan ini ada

// 1. CEK DULU: Apakah Environment Variables terbaca oleh Vercel?
if (!process.env.DB_HOST) {
    throw new Error("❌ FATAL: DB_HOST tidak ditemukan! Cek Settings > Environment Variables di Vercel.");
}

// 2. Setup Sequelize
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        // PERBAIKAN PENTING: Jika DB_PORT kosong, paksa pakai 4000 (TiDB)
        port: process.env.DB_PORT || 4000, 
        dialect: 'mysql',
        dialectModule: mysql2,
        logging: false, 
        benchmark: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            // Samakan timeout koneksi dengan acquire pool
            connectTimeout: 60000 
        },
        pool: {
            max: 5,
            min: 0,
            // Naikkan ke 60 detik agar tidak cepat menyerah
            acquire: 60000, 
            idle: 10000
        }
    }
);

console.log(`📡 Mencoba konek ke Host: ${process.env.DB_HOST} pada Port: ${process.env.DB_PORT || 4000}`);

module.exports = db;