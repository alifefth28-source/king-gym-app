const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2'); // Wajib untuk Vercel

// Pastikan DATABASE_URL ada di Environment Variables (.env)
if (!process.env.DATABASE_URL) {
    throw new Error('❌ DATABASE_URL tidak ditemukan di environment variables!');
}

const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    dialectModule: mysql2, // 🔥 Tetap WAJIB ada untuk Vercel/Serverless
    logging: false, // Set ke console.log jika ingin melihat raw SQL query
    dialectOptions: {
        ssl: {
            
            rejectUnauthorized: false // Mengizinkan Self-signed certs (standar untuk cloud db)
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }``
});

// Logging status koneksi (mengambil host dari config sequelize yang sudah di-parse)
console.log(`📡 Mencoba konek ke DB Host: ${db.config.host}`);

db.authenticate()
  .then(() => console.log('✅ BERHASIL KONEK DATABASE (Via URL)!'))
  .catch(err => console.error('❌ GAGAL KONEK DATABASE:', err));

module.exports = db;