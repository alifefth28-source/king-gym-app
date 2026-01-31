const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2'); // Wajib import ini untuk Vercel
require('dotenv').config();

// Gunakan Env Variable (agar bisa connect ke TiDB di Vercel)
const db = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        
        // --- INI OBAT ERROR VERCEL YANG TADI ---
        dialectModule: mysql2, 
        // ---------------------------------------

        logging: false,
        dialectOptions: {
            // TiDB biasanya butuh SSL, ini settingan aman:
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

// Cek koneksi (Opsional, biar tau di logs kalau sukses)
db.authenticate()
  .then(() => console.log('✅ Berhasil konek ke Database (TiDB/Local)'))
  .catch(err => console.error('❌ Gagal konek ke Database:', err));

module.exports = db;