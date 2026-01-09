const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const User = sequelize.define('User', {

    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    role: {
        type: DataTypes.STRING,
        defaultValue: 'member'
    },

    profile_picture: {
        type: DataTypes.STRING,
        allowNull: true 
    },

    membership_expiry: {
        type: DataTypes.DATE, 
        allowNull: true
    },

    membership_type: {
        type: DataTypes.STRING,
        allowNull: true
    }
});



module.exports = User;