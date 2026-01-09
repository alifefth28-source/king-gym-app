import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MySwal from '../utils/MySwal'; 
import Swal from 'sweetalert2'; 

const AdminMembers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    useEffect(() => {
        if (role !== 'admin') {
            alert("Akses Ditolak! Khusus Admin.");
            navigate('/dashboard');
        } else {
            fetchUsers();
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/auth/users');
            setUsers(res.data);
        } catch (err) {
            console.error("Gagal ambil data user:", err);
        }
    };

 const handleAddMember = async () => {
        
        // 1. FORM DENGAN PILIHAN PAKET
        const { value: formValues } = await Swal.fire({
            title: 'Registrasi Member Baru',
            html: `
                <div style="text-align: left;">
                    <label style="font-size: 14px; font-weight: bold;">Username</label>
                    <input id="swal-username" class="swal2-input" placeholder="Nama Member" style="margin: 5px 0 15px 0; width: 100%;">
                    
                    <label style="font-size: 14px; font-weight: bold;">Email</label>
                    <input id="swal-email" class="swal2-input" placeholder="member@gym.com" type="email" style="margin: 5px 0 15px 0; width: 100%;">
                    
                    <label style="font-size: 14px; font-weight: bold;">Password</label>
                    <input id="swal-password" class="swal2-input" placeholder="Buat Password" type="password" style="margin: 5px 0 15px 0; width: 100%;">

                    <label style="font-size: 14px; font-weight: bold;">Pilih Paket (Opsional)</label>
                    <select id="swal-paket" class="swal2-input" style="margin: 5px 0 0 0; width: 100%;">
                        <option value="">-- Tanpa Paket (User Biasa) --</option>
                        <option value="Silver">⚪ Silver (30 Hari - Rp 100rb)</option>
                        <option value="Gold">🟡 Gold (90 Hari - Rp 300rb)</option>
                        <option value="Platinum">⚫ Platinum (1 Tahun - Rp 2.5jt)</option>
                    </select>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Simpan Member',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#4f46e5',
            preConfirm: () => {
                const username = document.getElementById('swal-username').value;
                const email = document.getElementById('swal-email').value;
                const password = document.getElementById('swal-password').value;
                const membershipType = document.getElementById('swal-paket').value; // Ambil nilai paket

                if (!username || !email || !password) {
                    Swal.showValidationMessage('Username, Email, dan Password wajib diisi!');
                    return false;
                }
                // Kembalikan semua data termasuk paket
                return { username, email, password, membershipType };
            }
        });

        
        if (formValues) {
            try {
                await axios.post('http://localhost:5000/api/auth/register', formValues);
                
               
                let pesan = `Member ${formValues.username} berhasil didaftarkan.`;
                if (formValues.membershipType) {
                    pesan += ` Paket: ${formValues.membershipType}.`;
                }

                MySwal.alert('success', 'Berhasil!', pesan);
                fetchUsers();
            } catch (err) {
                MySwal.alert('error', 'Gagal Daftar', err.response?.data?.message || 'Terjadi kesalahan sistem.');
            }
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-7xl mx-auto py-10 px-4">
                
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">Daftar Member Terdaftar</h1>
                    
                    <button 
                        onClick={handleAddMember}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition transform hover:scale-105 flex items-center gap-2"
                    >
                        <span>+</span> Tambah Member Manual
                    </button>
                </div>

                <div className="bg-white shadow overflow-hidden rounded-lg overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Paket</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Masa Aktif</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Bergabung Sejak</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-bold text-gray-900">{user.username}</div>
                                        <div className="text-xs text-gray-500">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {user.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.membership_type ? (
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-bold rounded-full 
                                                ${user.membership_type === 'Platinum' ? 'bg-gray-800 text-white' : 
                                                  user.membership_type === 'Gold' ? 'bg-yellow-100 text-yellow-800' : 
                                                  'bg-gray-200 text-gray-800'}`}>
                                                {user.membership_type}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 text-sm">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {user.membership_expiry ? (
                                            (() => {
                                                const expiryDate = new Date(user.membership_expiry);
                                                const today = new Date();
                                                const isExpired = expiryDate < today;

                                                return (
                                                    <span className={`font-medium ${isExpired ? 'text-red-600' : 'text-green-600'}`}>
                                                        {expiryDate.toLocaleDateString('id-ID', {
                                                            day: 'numeric', month: 'short', year: 'numeric'
                                                        })}
                                                        {isExpired && <span className="ml-1 text-xs bg-red-100 text-red-600 px-1 rounded border border-red-200">Expired</span>}
                                                    </span>
                                                );
                                            })()
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString('id-ID', {
                                            day: 'numeric', month: 'short', year: 'numeric'
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                    <span>Total User: <b>{users.length}</b> orang</span>
                    <span className="text-xs italic text-gray-400">*Member dengan status Expired perlu perpanjang paket.</span>
                </div>
            </div>
        </div>
    );
};

export default AdminMembers;