const User = require('../models/User');

exports.joinMembership = async (req, res) => {
    try {
        const { type, durationDays } = req.body;
        const userId = req.user.id; 

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + parseInt(durationDays));
        await User.update({
            membership_type: type,   
            membership_expiry: expiryDate 
        }, {
            where: { id: userId }
        });

        res.status(200).json({ 
            message: `Selamat! Membership ${type} aktif sampai ${expiryDate.toDateString()}` 
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal memproses membership.");
    }
};