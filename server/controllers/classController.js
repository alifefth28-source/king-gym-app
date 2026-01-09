const Class = require('../models/Class');
const Booking = require('../models/Booking'); 
const sequelize = require('../db'); 


exports.createClass = async (req, res) => {
    try {
        const { name, instructor, schedule, quota } = req.body;
        const newClass = await Class.create({ name, instructor, schedule, quota });
        res.status(201).json({ message: "Kelas berhasil dibuat!", data: newClass });
    } catch (err) {
        res.status(500).send(err.message);
    }
};


exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.findAll({
            attributes: {
                include: [
                    [sequelize.fn("COUNT", sequelize.col("Bookings.id")), "booked"]
                ]
            },
            include: [{
                model: Booking,
                attributes: [] 
            }],
            group: ['Class.id'], 
            order: [['schedule', 'ASC']]
        });

        res.json(classes);

    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal mengambil data kelas");
    }
};


exports.deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        await Class.destroy({ where: { id } });
        res.json({ message: "Kelas berhasil dihapus" });
    } catch (err) {
        res.status(500).send("Gagal menghapus kelas");
    }
};