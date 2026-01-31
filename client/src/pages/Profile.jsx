import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MySwal from '../utils/MySwal';
import MemberCard from '../components/MemberCard'; 

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    // 1. FUNGSI AMBIL DATA USER
    const fetchProfile = async () => {
        try {
            const res = await axios.get('https://king-gym-api.vercel.app/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(res.data);
        } catch (err) {
            console.error("Gagal load profile:", err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // 2. FUNGSI UPLOAD FOTO
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('photo', file);

        setLoading(true);
        try {
            await axios.post('https://king-gym-api.vercel.app/api/auth/upload-photo', formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            MySwal.toast('success', 'Foto Profil Berhasil Diupdate!');
            fetchProfile(); 
        } catch (err) {
            console.error(err);
            MySwal.toast('error', 'Gagal mengupload foto');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
            <Navbar />
            
            {/* CONTAINER UTAMA */}
            <div className="max-w-6xl mx-auto py-12 px-4 flex-grow w-full">
                
                {/* --- HEADER JUDUL --- */}
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                    Profil Saya
                </h1>

                {/* --- GRID LAYOUT (KIRI: KARTU, KANAN: DATA DIRI) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    
                    {/* BAGIAN KIRI: KARTU MEMBER DIGITAL */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
                        <h2 className="text-lg font-bold text-gray-700 mb-6">Kartu Member Digital</h2>
                        
                        {/* COMPONENT KARTU QR */}
                        <div className="w-full">
                            <MemberCard user={user} />
                        </div>

                        <p className="text-xs text-gray-400 mt-6 italic text-center max-w-xs">
                            *Tunjukkan QR Code ini kepada resepsionis saat Check-in masuk gym.
                        </p>
                    </div>

                    {/* BAGIAN KANAN: DATA DIRI */}
                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                        
                        {/* HEADER BIRU */}
                        <div className="bg-indigo-600 p-8 text-center">
                            {/* FOTO PROFIL */}
                            <div className="relative w-32 h-32 mx-auto mb-4 group">
                                {user.profile_picture ? (
                                    <img 
                                        src={user.profile_picture} 
                                        alt="Profile" 
                                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg bg-white"
                                    />
                                ) : (
                                    // GANTI EMOJI ORANG DENGAN SVG USER
                                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}

                                {/* TOMBOL KAMERA (UPLOAD) */}
                                <label className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full cursor-pointer hover:bg-blue-500 transition shadow-md border-2 border-white flex items-center justify-center">
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        disabled={loading}
                                    />
                                    {loading ? (
                                        <span className="text-xs font-bold">...</span>
                                    ) : (
                                        // GANTI EMOJI KAMERA DENGAN SVG
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </label>
                            </div>

                            <h1 className="text-2xl font-bold text-white capitalize tracking-wide">
                                {user.username}
                            </h1>
                            <p className="text-indigo-200 text-sm">{user.email}</p>
                        </div>

                        {/* DETAIL INFO */}
                        <div className="p-8 space-y-6">
                            {/* Status Membership */}
                            <div className="border-b border-gray-100 pb-4">
                                <label className="text-gray-400 text-xs font-bold uppercase tracking-wider">Status Membership</label>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className={`text-2xl font-bold ${user.membership_type ? 'text-gray-800' : 'text-gray-400'}`}>
                                        {user.membership_type || "Belum Ada Member"}
                                    </span>
                                    {user.membership_type && (
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase tracking-wide">
                                            Aktif
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Masa Berlaku */}
                            {user.membership_type && (
                                <div className="border-b border-gray-100 pb-4">
                                    <label className="text-gray-400 text-xs font-bold uppercase tracking-wider">Masa Berlaku Sampai</label>
                                    <p className="text-lg font-medium text-gray-700 mt-1">
                                        {user.membership_expiry 
                                            ? new Date(user.membership_expiry).toLocaleDateString('id-ID', {
                                                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                                              })
                                            : "lifetime / invalid date"
                                        }
                                    </p>
                                </div>
                            )}

                            {/* Tombol Aksi */}
                            <div className="pt-2">
                                 {!user.membership_type ? (
                                    <a href="/membership" className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white text-center font-bold py-3 rounded-lg transition shadow-md transform hover:-translate-y-1">
                                        Beli Membership Sekarang 
                                    </a>
                                 ) : (
                                    <button className="w-full bg-gray-100 text-gray-500 font-bold py-3 rounded-lg cursor-default flex items-center justify-center gap-2">
                                        Membership Anda Aktif 
                                        {/* GANTI CENTANG DENGAN SVG */}
                                        <span className="text-green-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                    </button>
                                 )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;