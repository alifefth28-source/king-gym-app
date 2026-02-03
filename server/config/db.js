const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2'); // Wajib import ini untuk Vercel

// --- MODIFIKASI SUPAYA LOG BERSIH DI VERCEL ---
// Hanya jalankan dotenv kalau di Laptop (Development)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// ---------------------------------------------

const db = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        
        // --- OBAT ERROR VERCEL ---
        dialectModule: mysql2, 
        // -------------------------

        logging: false,
        dialectOptions: {
            // TiDB butuh SSL
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

// Cek koneksi
db.authenticate()
  .then(() => console.log('✅ Berhasil konek ke Database'))
  .catch(err => console.error('❌ Gagal konek ke Database:', err));

module.exports = db;