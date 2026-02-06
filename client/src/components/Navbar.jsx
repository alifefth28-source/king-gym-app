import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MySwal from '../utils/MySwal';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // State untuk menu mobile
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // --- LOGIC AUTH & ROLE ---
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Ambil role (admin/member)
    const user = JSON.parse(localStorage.getItem('user'));
    
    const isLoggedIn = !!token;
    const isAdmin = role === 'admin'; // Boolean check

    const handleLogout = async () => {
        const result = await MySwal.confirm(
            'Yakin ingin keluar?', 
            'Anda harus login lagi nanti.', 
            'Ya, Keluar'
        );

        if (result.isConfirmed) {
            localStorage.clear();
            MySwal.toast('success', 'Berhasil Logout');
            navigate('/login');
        }
    };

    // Efek scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- DAFTAR MENU (DIPISAH ANTARA MEMBER & ADMIN) ---
    
    // 1. Menu untuk MEMBER
    const memberItems = [
        { name: 'Cari Kelas', path: '/classes' },
        { name: 'Jadwal Saya', path: '/my-bookings' },
        { name: 'Membership', path: '/membership' },
        { name: 'Panduan Pemula', path: '/Tutorial' },
        { name: 'Profil Saya', path: '/profile' },
    ];

    // 2. Menu untuk ADMIN (Sesuaikan path ini dengan route di App.jsx Anda)
    const adminItems = [
        { name: 'Dashboard Admin', path: '/admin' },
        { name: 'Kelola Kelas', path: '/admin/manage-classes' }, // Opsional: Hapus jika belum ada pagenya
        { name: 'Validasi Member', path: '/admin/validasi' },    // Opsional
    ];

    // Pilih menu berdasarkan role
    const menuItems = isAdmin ? adminItems : memberItems;

    // --- LOGIC WARNA NAVBAR (Merah untuk Admin, Hitam untuk Member) ---
    const getNavbarBg = () => {
        if (isAdmin) {
            return scrolled ? 'bg-red-900 shadow-xl py-2' : 'bg-red-800 py-4';
        } else {
            return scrolled ? 'bg-gray-900 shadow-xl py-2' : 'bg-gray-900 py-4'; // Tetap dark mode untuk member
        }
    };

    // Helper class untuk link aktif
    const getLinkClass = (path) => {
        const baseClass = "px-3 py-2 rounded-md text-sm font-medium transition duration-300";
        // Warna aktif beda dikit untuk admin biar kontras
        const activeClass = isAdmin 
            ? "bg-red-700 text-white shadow-lg transform scale-105" 
            : "bg-indigo-600 text-white shadow-lg transform scale-105";
            
        const inactiveClass = "text-gray-300 hover:bg-gray-700 hover:text-white";

        return location.pathname === path ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;
    };

    return (
        <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${getNavbarBg()}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    
                    {/* LOGO */}
                    <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate(isAdmin ? '/admin' : '/')}>
                        <h1 className="text-2xl font-extrabold tracking-tighter text-white">
                            KING <span className={isAdmin ? "text-yellow-400" : "text-indigo-500"}>
                                {isAdmin ? 'ADMIN' : 'GYM'}
                            </span>
                        </h1>
                    </div>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {isLoggedIn ? (
                                <>
                                    {menuItems.map((item) => (
                                        <Link key={item.path} to={item.path} className={getLinkClass(item.path)}>
                                            {item.name}
                                        </Link>
                                    ))}
                                    <button 
                                        onClick={handleLogout} 
                                        className={`${isAdmin ? 'bg-gray-800 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'} text-white px-4 py-2 rounded-md text-sm font-bold ml-4 transition shadow-md`}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                                    <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-indigo-700 transition">Daftar Sekarang</Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* MOBILE MENU BUTTON (Hamburger) */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {isOpen && (
                <div className="md:hidden bg-gray-800 absolute w-full shadow-2xl border-t border-gray-700">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {isLoggedIn ? (
                            <>
                                <div className="px-3 py-2 text-gray-400 text-sm font-bold border-b border-gray-700 mb-2">
                                    Halo, {isAdmin ? 'Admin' : (user?.username || 'Member')} 👋
                                </div>
                                {menuItems.map((item) => (
                                    <Link 
                                        key={item.path} 
                                        to={item.path} 
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-3 rounded-md text-base font-medium"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <button 
                                    onClick={() => { setIsOpen(false); handleLogout(); }}
                                    className="w-full text-left bg-red-600 hover:bg-red-700 text-white block px-3 py-3 rounded-md text-base font-bold mt-4"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col space-y-2 mt-4">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-3 rounded-md text-base font-medium">Login</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="bg-indigo-600 text-white block px-3 py-3 rounded-md text-base font-bold text-center">Daftar Sekarang</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;