import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MySwal from '../utils/MySwal';

const CreateClass = () => {
    const [name, setName] = useState('');
    const [instructor, setInstructor] = useState('');
    
    // KITA PECAH JADI DUA BIAR RAPI
    const [date, setDate] = useState(''); 
    const [time, setTime] = useState('');
    
    const [quota, setQuota] = useState('');
    
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    useEffect(() => {
        if (!role || (role !== 'admin' && role !== 'ADMIN')) {
            alert("AKSES DITOLAK! Halaman ini khusus Admin.");
            navigate('/dashboard');
        }
    }, [navigate, role]);

   const handleSubmit = async (e) => {
        e.preventDefault();

      
        if (!name || !instructor || !date || !time || !quota) {
            return MySwal.alert('warning', 'Data Belum Lengkap', 'Mohon isi semua kolom formulir.');
        }

      
        const combinedSchedule = `${date}T${time}`; 

        try {
            await axios.post('http://localhost:5000/api/classes', 
                { 
                    name, 
                    instructor, 
                    schedule: combinedSchedule, 
                    quota 
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

           
            await MySwal.alert('success', 'Berhasil!', 'Kelas baru telah ditambahkan.');
            navigate('/admin');

        } catch (err) {
            console.error(err); 
            
            MySwal.alert('error', 'Gagal', 'Terjadi kesalahan saat menyimpan data.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Navbar />
            
            <div className="max-w-2xl mx-auto py-10 px-4">
                <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-indigo-600">
                    <h1 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                        Tambah Jadwal Kelas
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Nama Kelas</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="Contoh: Yoga Sunrise"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                      
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Instruktur</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="Contoh: Coach Budi"
                                value={instructor}
                                onChange={(e) => setInstructor(e.target.value)}
                            />
                        </div>

                        
                        <div className="grid grid-cols-2 gap-4">
                         
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Tanggal</label>
                                <input 
                                    type="date" 
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-600"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>

 
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Jam Mulai</label>
                                <input 
                                    type="time" 
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-600"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                        </div>


                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Kuota Peserta</label>
                            <input 
                                type="number" 
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="Contoh: 20"
                                value={quota}
                                onChange={(e) => setQuota(e.target.value)}
                            />
                        </div>

                        
                        <button 
                            type="submit" 
                            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 active:scale-95 transition duration-200 shadow-md mt-4"
                        >
                            Simpan Jadwal 
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateClass;