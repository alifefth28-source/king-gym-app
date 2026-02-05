const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2'); 



const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('❌ DATABASE_URL tidak ditemukan di environment variables!');
}

// 2. Setup Sequelize
const db = new Sequelize(connectionString, {
    dialect: 'mysql',
    dialectModule: mysql2, 
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
});

console.log(`📡 Mencoba konek ke DB...`);

module.exports = db;