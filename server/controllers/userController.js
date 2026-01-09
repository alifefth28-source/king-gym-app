const User = require('../models/User');


exports.buyMembership = async (req, res) => {
    try {
        const { membershipType } = req.body; 
        const userId = req.user.id;

        const currentUser = await User.findByPk(userId);

        if (!currentUser) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }


        let additionalDays = 30;
        if (membershipType === 'Gold') additionalDays = 90;
        if (membershipType === 'Platinum') additionalDays = 365;

        let newExpiryDate;
        const today = new Date();
        const currentExpiry = currentUser.membership_expiry ? new Date(currentUser.membership_expiry) : null;
        const isCurrentActive = currentExpiry && currentExpiry > today;


        if (isCurrentActive && currentUser.membership_type === membershipType) {

            newExpiryDate = new Date(currentExpiry);
            newExpiryDate.setDate(newExpiryDate.getDate() + additionalDays);
            
            console.log("Mode: PERPANJANG PAKET");
        } 

        else {
            newExpiryDate = new Date(today);
            newExpiryDate.setDate(newExpiryDate.getDate() + additionalDays);
            
            console.log("Mode: BARU / GANTI PAKET / SUDAH EXPIRED");
        }

        await User.update(
            { 
                membership_type: membershipType,
                membership_expiry: newExpiryDate 
            },
            { where: { id: userId } }
        );

        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = newExpiryDate.toLocaleDateString('id-ID', options);

        res.json({ 
            message: `Sukses! Membership ${membershipType} aktif sampai ${formattedDate}`, 
            expiry: newExpiryDate,
            type: membershipType
        });

    } catch (err) {
        console.error("Error buy membership:", err);
        res.status(500).json({ message: "Gagal memproses membership" });
    }
};