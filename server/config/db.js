const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2'); 

// Setup Sequelize dengan Parameter Terpisah (Lebih Aman)
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        dialectModule: mysql2, // Wajib untuk Vercel
        logging: false, 
        benchmark: true, // Untuk melihat berapa lama koneksi berjalan
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            connectTimeout: 60000 // Tambah waktu timeout jadi 60 detik (untuk jaga-jaga TiDB tidur)
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

console.log(`📡 Mencoba konek ke Host: ${process.env.DB_HOST}`);

module.exports = db;