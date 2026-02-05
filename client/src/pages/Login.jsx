import { useState } from 'react';
import axios from 'axios';  
import { useNavigate, Link } from 'react-router-dom';
import MySwal from '../utils/MySwal';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://king-gym-api.vercel.app/api/auth/login', { email, password });
            
           
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            
          
            localStorage.setItem('user', JSON.stringify({
                username: res.data.username, 
                email: email
            }));
          

            MySwal.toast('success', `Selamat Datang kembali!`);

            if (res.data.role === 'admin') {
                navigate('/admin'); 
            } else {
                navigate('/dashboard');
            }

        } catch (err) {
            MySwal.alert('error', 'Gagal Login', err.response?.data?.message || 'Cek email & password Anda');
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:flex w-1/2 bg-gray-900 justify-center items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" 
                    alt="Gym Background" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 text-white text-center p-10">
                    <h1 className="text-6xl font-bold mb-4 tracking-wider">KING GYM </h1>
                    <p className="text-2xl font-light">Build Your Legacy Here.</p>
                </div>
            </div>


            <div className="w-full lg:w-1/2 flex justify-center items-center bg-white p-6 md:p-10">
                <div className="w-full max-w-md space-y-6 md:space-y-8">
                    <div className="text-center">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-2">Login Member</h2>
                        <p className="text-gray-500">Silakan masuk untuk mengakses jadwal.</p>
                    </div>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Contoh: admin@gym.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
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
                                Masuk Sekarang
                            </button>
                        </div>
                    </form>
                    
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Belum punya akun? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Daftar di sini</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;