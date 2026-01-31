import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2'; 
import Navbar from '../components/Navbar';
import MySwal from '../utils/MySwal';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
    const [classes, setClasses] = useState([]);
    const [users, setUsers] = useState([]); 
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    useEffect(() => {
        if (role !== 'admin') {
            alert("DILARANG MASUK! Anda bukan Admin.");
            navigate('/dashboard'); 
        }
        fetchClasses();
        fetchUsers(); 
    }, []);

    const fetchClasses = async () => {
        try {
            const res = await axios.get('https://king-gym-api.vercel.app/api/classes');
            setClasses(res.data);
        } catch (err) { console.error(err); }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get('https://king-gym-api.vercel.app/api/auth/users');
            setUsers(res.data);
        } catch (err) { console.error(err); }
    };

    const handleDelete = async (id) => {
        const result = await MySwal.confirm('Hapus Kelas?', 'Data tidak bisa kembali!', 'Ya, Hapus');
        if (!result.isConfirmed) return;

        try {
            await axios.delete(`https://king-gym-api.vercel.app/api/classes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            MySwal.toast('success', "Kelas berhasil dihapus!");
            fetchClasses(); 
        } catch (err) {
            MySwal.alert('error', "Gagal menghapus kelas.");
        }
    };


    const silverCount = users.filter(u => u.membership_type === 'Silver').length;
    const goldCount = users.filter(u => u.membership_type === 'Gold').length;
    const platinumCount = users.filter(u => u.membership_type === 'Platinum').length;
    const nonMemberCount = users.filter(u => !u.membership_type).length;

    const membershipData = {
        labels: ['Silver', 'Gold', 'Platinum', 'Non-Member'],
        datasets: [
            {
                label: 'Jumlah Member',
                data: [silverCount, goldCount, platinumCount, nonMemberCount],
                backgroundColor: [
                    'rgba(192, 192, 192, 0.8)', 
                    'rgba(255, 206, 86, 0.8)', 
                    'rgba(54, 162, 235, 0.8)',  
                    'rgba(229, 231, 235, 0.8)',
                ],
                borderColor: [
                    'rgba(192, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(229, 231, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const classNames = classes.map(c => c.name);
    const classBooked = classes.map(c => c.booked); 

    const classData = {
        labels: classNames,
        datasets: [
            {
                label: 'Peserta Terdaftar',
                data: classBooked,
                backgroundColor: 'rgba(79, 70, 229, 0.7)', 
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            <div className="max-w-7xl mx-auto py-10 px-4">
                
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Executive Dashboard</h1>
                        <p className="text-gray-500 text-sm mt-1">Ringkasan performa King Gym hari ini.</p>
                    </div>
                    <Link to="/create-class" className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 shadow-lg transition transform hover:scale-105 mt-4 md:mt-0">
                        + Tambah Kelas Baru
                    </Link>
                </div>

                {/* --- SECTION 1: CHART VISUALIZATION --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    
                    {/* CHART KIRI: Member Distribution */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">Komposisi Member</h3>
                        <div className="h-64 flex justify-center">
                            <Doughnut data={membershipData} />
                        </div>
                    </div>

                    {/* CHART KANAN: Class Popularity */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">Popularitas Kelas</h3>
                        <div className="h-64 flex justify-center w-full">
                            <Bar 
                                data={classData} 
                                options={{ 
                                    responsive: true, 
                                    maintainAspectRatio: false,
                                    plugins: { legend: { position: 'top' } } 
                                }} 
                            />
                        </div>
                    </div>
                </div>

                {/* --- SECTION 2: DATA TABLE (YANG LAMA) --- */}
                <div className="bg-white shadow-xl overflow-hidden rounded-2xl">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h3 className="text-lg font-bold text-gray-800">Manajemen Jadwal Kelas</h3>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama Kelas</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Instruktur</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Jadwal</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Kuota</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {classes.map((cls) => (
                                <tr key={cls.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{cls.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{cls.instructor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(cls.schedule).toLocaleString('id-ID', {
                                            weekday: 'short', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' 
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cls.booked >= cls.quota ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {cls.booked} / {cls.quota}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button 
                                            onClick={() => handleDelete(cls.id)}
                                            className="text-red-600 hover:text-red-900 font-bold bg-red-50 px-3 py-1 rounded hover:bg-red-100 transition"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {classes.length === 0 && (
                        <div className="p-8 text-center text-gray-500">Belum ada kelas yang dibuat.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;