import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MySwal from '../utils/MySwal'; 

const Dashboard = () => {
    const [classes, setClasses] = useState([]);
    const token = localStorage.getItem('token'); 

    const fetchClasses = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/classes', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setClasses(res.data);
        } catch (err) {
            console.error("Gagal ambil data:", err);
        }
    };

    const handleBooking = async (classId, className) => {
        

        const result = await MySwal.confirm(
            'Booking Kelas?', 
            `Apakah Anda yakin ingin ikut kelas "${className}"?`, 
            'Ya, Booking Sekarang!'
        );

        if (!result.isConfirmed) return;

        try {
            await axios.post('http://localhost:5000/api/bookings', 
                { classId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            await MySwal.alert(
                'success', 
                'Booking Berhasil!', 
                `Anda resmi terdaftar di kelas ${className}.`
            );
            
            fetchClasses(); 

        } catch (err) {
            console.error(err);
            const pesanError = err.response?.data?.message || "Gagal Booking";
            MySwal.alert('error', 'Gagal Booking', pesanError);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
            <Navbar />

            <div className="max-w-7xl mx-auto py-10 px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Jadwal Kelas Tersedia
                    </h1>
                </div>           
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {classes.map((cls) => (
                        <div key={cls.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                            
                            
                            <div className="bg-indigo-600 p-4">
                                <h3 className="text-xl font-bold text-white tracking-wide">
                                    {cls.name}
                                </h3>
                                <p className="text-indigo-100 text-sm mt-1">
                                    Coach: {cls.instructor}
                                </p>
                            </div>                            
                            <div className="p-6">                            
                                <div className="mb-4 text-gray-600 flex items-center gap-2">                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-medium text-sm">
                                        {new Date(cls.schedule).toLocaleString('id-ID', {
                                            weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <div className="flex justify-between text-sm font-semibold mb-2">
                                        <span className={cls.booked >= cls.quota ? "text-red-500" : "text-green-600"}>
                                            {cls.booked >= cls.quota ? "Penuh" : "Tersedia"}
                                        </span>
                                        <span className="text-gray-500">{cls.booked} / {cls.quota} Peserta</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div 
                                            className={`h-3 rounded-full transition-all duration-500 ${
                                                cls.booked >= cls.quota ? 'bg-red-500' : 'bg-green-500'
                                            }`} 
                                            style={{ width: `${Math.min((cls.booked / cls.quota) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                
                                <button 
                                    onClick={() => handleBooking(cls.id, cls.name)}
                                    disabled={cls.booked >= cls.quota}
                                    className={`w-full py-3 px-4 rounded-xl font-bold text-white shadow-md transition-transform transform active:scale-95 flex items-center justify-center gap-2
                                        ${cls.booked >= cls.quota 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
                                        }
                                    `}
                                >
                                    {cls.booked >= cls.quota ? (
                                        "KELAS PENUH"
                                    ) : (
                                        <>
                                            BOOK NOW
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;