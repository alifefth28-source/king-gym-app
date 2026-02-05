import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import MySwal from '../utils/MySwal';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    // Tambahan: State untuk mengetahui apakah sedang loading atau ada error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const token = localStorage.getItem('token');

    // URL API yang benar
    const API_URL = 'https://king-gym-p2ipsya6b-radjas-projects-b03780ee.vercel.app/api';

    const fetchMyBookings = async () => {
        setLoading(true); // Mulai loading
        setError(null);   // Reset error
        try {
            const res = await axios.get(`${API_URL}/bookings`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(res.data);
        } catch (err) {
            console.error("Gagal ambil data booking:", err);
            // Simpan pesan error untuk ditampilkan di UI
            setError("Gagal mengambil data. Pastikan koneksi internet stabil atau coba login ulang.");
        } finally {
            setLoading(false); // Selesai loading (baik sukses maupun gagal)
        }
    };

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const handleCancel = async (bookingId) => {
        const result = await MySwal.confirm(
            'Batalkan Booking?',
            'Kuota kelas akan dikembalikan ke sistem.',
            'Ya, Batalkan'
        );

        if (!result.isConfirmed) return;

        try {
            await axios.delete(`${API_URL}/bookings/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            MySwal.toast('success', 'Booking berhasil dibatalkan');
            fetchMyBookings(); 

        } catch (err) {
            console.error(err); 
            MySwal.alert('error', 'Gagal', 'Tidak bisa membatalkan booking ini.');
        }
    };
    
    // Helper function untuk format tanggal
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', { 
            weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' 
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Navbar />

            <div className="max-w-5xl mx-auto py-8 px-4 md:py-12">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center md:text-left">
                    Jadwal Latihan Saya
                </h1>

                {/* --- LOGIC TAMPILAN BERDASARKAN STATUS --- */}
                {loading ? (
                    // TAMPILAN SAAT LOADING
                    <div className="text-center py-10">
                        <p className="text-xl font-bold text-gray-500 animate-pulse">⏳ Sedang memuat jadwal...</p>
                    </div>
                ) : error ? (
                    // TAMPILAN SAAT ERROR
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
                        <strong className="font-bold">Terjadi Kesalahan! </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                ) : bookings.length === 0 ? (
                    // TAMPILAN SAAT DATA KOSONG
                    <div className="bg-white p-10 rounded-xl shadow-md text-center text-gray-500">
                        <p className="text-xl font-medium">Belum ada kelas yang di-booking.</p>
                        <p className="mt-2 text-sm">Ayo cari kelas di menu "Cari Kelas"!</p>
                    </div>
                ) : (
                    // TAMPILAN DATA (TABLE & CARD)
                    <>
                        {/* --- TAMPILAN DESKTOP (TABEL) --- */}
                        <div className="hidden md:block bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-900 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Nama Kelas</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Instruktur</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Jadwal</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900 text-sm">{item.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{item.instructor}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm font-medium">
                                                {formatDate(item.schedule)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-800 border border-green-200">
                                                    Terdaftar
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <button 
                                                    onClick={() => handleCancel(item.id, item.name)}
                                                    className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-4 py-1 rounded-md transition text-xs font-bold"
                                                >
                                                    Batalkan
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* --- TAMPILAN MOBILE (KARTU) --- */}
                        <div className="md:hidden space-y-4">
                            {bookings.map((item) => (
                                <div key={item.id} className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex flex-col space-y-3">
                                    
                                    {/* Header Kartu */}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                            <p className="text-indigo-600 text-xs font-bold uppercase tracking-wide mt-1">{item.instructor}</p>
                                        </div>
                                        <span className="px-2 py-1 text-xs font-bold rounded bg-green-100 text-green-800 border border-green-200">
                                            Aktif
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-100"></div>

                                    {/* Info Jadwal */}
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {formatDate(item.schedule)}
                                    </div>

                                    {/* Tombol Aksi */}
                                    <button 
                                        onClick={() => handleCancel(item.id, item.name)}
                                        className="w-full mt-2 bg-red-50 text-red-600 font-bold py-3 rounded-lg hover:bg-red-100 transition border border-red-200 flex items-center justify-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Batalkan Booking
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyBookings;