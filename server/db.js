const { Sequelize } = require('sequelize');

// Konfigurasi Database
// Format: new Sequelize('nama_database', 'username_sql', 'password_sql', { ... })

const sequelize = new Sequelize('gym_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // Supaya terminal bersih dari log SQL
});

module.exports = sequelize;