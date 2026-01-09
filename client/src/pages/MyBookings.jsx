import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import MySwal from '../utils/MySwal';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const token = localStorage.getItem('token');

    const fetchMyBookings = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/bookings', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(res.data);
        } catch (err) {
            console.error("Gagal ambil data booking:", err);
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
            await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            

            MySwal.toast('success', 'Booking berhasil dibatalkan');
            

            fetchMyBookings(); 


        } catch (err) {
            console.error(err); 
            MySwal.alert('error', 'Gagal', 'Tidak bisa membatalkan booking ini.');
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-4xl mx-auto py-12 px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Jadwal Latihan Saya</h1>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {bookings.length === 0 ? (
                        <div className="p-10 text-center text-gray-500">
                            <p className="text-xl">Belum ada kelas yang di-booking.</p>
                            <p className="mt-2">Ayo cari kelas di Dashboard!</p>
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama Kelas</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Instruktur</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jadwal</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                    {/* TAMBAH KOLOM AKSI */}
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookings.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.instructor}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                            {new Date(item.schedule).toLocaleDateString('id-ID', { 
                                                weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' 
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Terdaftar
                                            </span>
                                        </td>
                                        {/* TOMBOL BATAL */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button 
                                                onClick={() => handleCancel(item.id, item.name)}
                                                className="text-red-600 hover:text-red-900 font-bold text-sm hover:underline"
                                            >
                                                Batalkan
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBookings;