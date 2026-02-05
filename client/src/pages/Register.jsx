import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import MySwal from '../utils/MySwal'; 

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post('https://king-gym-api.vercel.app/api/auth/register', {
                username,
                email,
                password
            });
            
            
            await MySwal.alert(
                'success', 
                'Registrasi Berhasil!', 
                'Akun Anda telah dibuat. Silakan Login.'
            );
            
            navigate('/login'); 
         

        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || "Gagal mendaftar (Cek koneksi/database)";
            setError(typeof err.response?.data === 'string' ? err.response.data : msg);

            MySwal.alert('error', 'Gagal Daftar', msg);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Bagian Kiri (Gambar) */}
            <div className="hidden lg:flex w-1/2 bg-gray-900 justify-center items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
                
                <img 
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop" 
                    alt="Gym Dumbbell" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 text-white text-center p-10">
                    <h1 className="text-5xl font-bold mb-4">JOIN THE KINGDOM</h1>
                    <p className="text-xl">Mulai perjalananmu menjadi lebih kuat hari ini.</p>
                </div>
            </div>

            {/* Bagian Kanan (Form) */}
            <div className="w-full lg:w-1/2 flex justify-center items-center bg-white p-6 md:p-10">
                <div className="w-full max-w-md space-y-6 md:space-y-8">
                    <div className="text-center">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-2">Daftar Member Baru</h2>
                        <p className="text-gray-500">Bergabunglah dengan komunitas King Gym.</p>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                        <div className="rounded-md shadow-sm space-y-4">
                            {/* Input Username */}
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nama Lengkap / Username</label>
                                <input
                                    type="text"
                                    required
                                    className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Contoh: Ratu Gym"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Contoh: ratu@gym.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/*InputPassword*/}
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                            >
                                Daftar Sekarang
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Sudah punya akun? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Login di sini</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;