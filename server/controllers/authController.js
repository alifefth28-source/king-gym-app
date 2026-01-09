
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



exports.register = async (req, res) => {
    try {
        console.log("1. Menerima Data:", req.body); 

        const { username, email, password, role } = req.body;

       
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send('Email sudah terdaftar!');
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'member'
        });

        console.log("✅ SUKSES: User berhasil dibuat!"); 
        res.status(201).json({ message: "Registrasi Berhasil!", user: newUser });

    } catch (err) {
        console.error("❌ ERROR REGISTER:", err);
        res.status(500).send("Terjadi kesalahan server: " + err.message);
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).send('Email tidak ditemukan!');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Password salah!');

        const token = jwt.sign({ id: user.id, role: user.role }, 'RAHASIA_NEGARA', { expiresIn: '1h' });

        res.json({
        token,
        role: user.role,
        username: user.username, // <--- PASTIKAN BARIS INI ADA
        message: "Login berhasil"
    });

    } catch (err) {
        console.error(err);
        res.status(500).send("Terjadi kesalahan server");
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal ambil data users");
    }
};


exports.getMe = async (req, res) => {
    try {
        // Ambil data user berdasarkan ID dari token, tapi sembunyikan passwordnya
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        
        if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal mengambil profil");
    }
};

exports.uploadPhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Tidak ada file yang diupload." });
        }

        const userId = req.user.id;
        const photoUrl = `http://localhost:5000/uploads/${req.file.filename}`;

        await User.update({ profile_picture: photoUrl }, { where: { id: userId } });

        res.json({ 
            message: "Foto profil berhasil diupdate!", 
            photoUrl: photoUrl 
        });

    } catch (err) {
        console.error("Gagal upload:", err);
        res.status(500).json({ message: "Gagal mengupload foto." });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'role', 'createdAt', 'membership_type', 'membership_expiry']// Ambil data penting saja
        });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal mengambil data user" });
    }
};

exports.register = async (req, res) => {
    try {
        // 1. Terima membershipType juga dari body
        const { username, email, password, membershipType } = req.body; 

        // Cek user ganda
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "Email sudah terdaftar" });

        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. LOGIC HITUNG EXPIRY (Jika paket dipilih)
        let membership_expiry = null;
        let finalMembershipType = null;

        if (membershipType && membershipType !== "") {
            finalMembershipType = membershipType;
            const now = new Date();
            
            // Tambahkan hari sesuai paket
            if (membershipType === 'Silver') now.setDate(now.getDate() + 30);
            else if (membershipType === 'Gold') now.setDate(now.getDate() + 90);
            else if (membershipType === 'Platinum') now.setDate(now.getDate() + 365);
            
            membership_expiry = now;
        }

        // 3. Simpan ke Database
        const newUser = await User.create({
            username, 
            email, 
            password: hashedPassword,
            role: 'member', // Default role
            membership_type: finalMembershipType,   // Simpan Tipe
            membership_expiry: membership_expiry    // Simpan Tanggal Expired
        });

        res.status(201).json({ message: "Registrasi berhasil", userId: newUser.id });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};