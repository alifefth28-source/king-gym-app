const Booking = require('../models/Booking');
const Class = require('../models/Class');
const User = require('../models/User');

exports.createBooking = async (req, res) => {
    try {
        const { classId } = req.body;
        const userId = req.user.id; 
        const gymClass = await Class.findByPk(classId);
        if (!gymClass) {
            return res.status(404).json({ message: "Kelas tidak ditemukan!" });
        }
        const user = await User.findByPk(userId);
        if (!user.membership_type) {
            return res.status(403).json({ message: "Akses Ditolak! Anda belum berlangganan Membership." });
        }


        const totalBooked = await Booking.count({ where: { ClassId: classId } });
        
        if (totalBooked >= gymClass.quota) {
            return res.status(400).json({ message: "Yah, Kuota Habis!" });
        }
        const existingBooking = await Booking.findOne({
            where: { ClassId: classId, UserId: userId }
        });
        
        if (existingBooking) {
            return res.status(400).json({ message: "Anda sudah terdaftar di kelas ini!" });
        }
        await Booking.create({
            ClassId: classId,
            UserId: userId
        });
        res.status(201).json({ message: "Booking Berhasil! Semangat Latihan! 💪" });

    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal melakukan booking.");
    }
};

exports.getMyBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await Booking.findAll({
            where: { UserId: userId },
            include: [
                {
                    model: Class,
                    attributes: ['name', 'instructor', 'schedule'] 
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        const formattedData = bookings.map(b => ({
            id: b.id,
            name: b.Class ? b.Class.name : "Kelas Dihapus",
            instructor: b.Class ? b.Class.instructor : "-",
            schedule: b.Class ? b.Class.schedule : new Date(),
        }));

        res.json(formattedData);

    } catch (err) {
        console.error("Error ambil booking:", err);
        res.status(500).send("Gagal mengambil data booking.");
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const userId = req.user.id;
        const booking = await Booking.findOne({ 
            where: { id: bookingId, userId: userId } 
        });

        if (!booking) {
            return res.status(404).json({ message: "Booking tidak ditemukan atau bukan milik Anda." });
        }
        const classData = await Class.findByPk(booking.classId);
        if (classData) {
            await classData.decrement('booked'); 
        }

 
        await booking.destroy();

        res.json({ message: "Booking berhasil dibatalkan" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal membatalkan booking" });
    }
};