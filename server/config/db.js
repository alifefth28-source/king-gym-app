const mysql = require('mysql2');
const dotenv = require('dotenv');


dotenv.config();

// Membuat koneksi
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '',      
    database: 'gym_db' 
});

db.connect((err) => {
    if (err) {
        console.error(' Gagal konek ke Database:', err.message);
    } else {
        console.log('Berhasil konek ke Database MySQL (Laragon)');
    }
});

module.exports = db;