const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2'); // Wajib untuk Vercel

// HAPUS BAGIAN DOTENV (Biar log bersih)
// Environment variables akan otomatis dibaca oleh Vercel

const db = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        dialectModule: mysql2, // 🔥 PASTIKAN INI ADA
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
    }
);

// Logging manual agar kita tahu statusnya di Vercel Logs
console.log(`📡 Mencoba konek ke DB: ${process.env.DB_NAME} @ ${process.env.DB_HOST}`);

db.authenticate()
  .then(() => console.log('✅ BERHASIL KONEK DATABASE!'))
  .catch(err => console.error('❌ GAGAL KONEK DATABASE:', err));

module.exports = db;