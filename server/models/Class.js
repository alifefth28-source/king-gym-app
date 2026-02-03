const { DataTypes } = require('sequelize');
const db = require('./config/db');

const Class = sequelize.define('Class', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instructor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    schedule: {
        type: DataTypes.DATE,
        allowNull: false
    },
    quota: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Class;