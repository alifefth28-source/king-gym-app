const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Class = require('./Class');

const Booking = sequelize.define('Booking', {
    bookingDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

User.hasMany(Booking);
Booking.belongsTo(User);


Class.hasMany(Booking);
Booking.belongsTo(Class);

module.exports = Booking;