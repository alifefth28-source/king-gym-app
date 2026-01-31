import { Link, useNavigate } from "react-router-dom";
import MySwal from '../utils/MySwal'; 

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  const handleLogout = async () => {

    const result = await MySwal.confirm(
        "Ingin Keluar?", 
        "Sesi Anda akan diakhiri.", 
        "Ya, Logout"
    );


    if (!result.isConfirmed) return;


    localStorage.clear();
    

    MySwal.toast('success', 'Sampai jumpa lagi!');

    navigate("/login");
  };

  const navbarColor = role === "admin" ? "bg-red-900" : "bg-gray-900";

  return (
    <nav
      className={`${navbarColor} text-white shadow-lg transition-colors duration-300 sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
        
          <div className="flex items-center">
            <Link
              to={role === "admin" ? "/admin" : "/"}
              className="text-2xl font-bold tracking-wider hover:text-gray-300 transition"
            >
              {role === "admin" ? "KING ADMIN" : "KING GYM "}
            </Link>


            <div className="ml-10 flex space-x-4">
              {role === "admin" ? (

                <>
                  <Link to="/admin" className="hover:text-red-200 font-medium transition">
                    Kelola Kelas
                  </Link>
                  <Link to="/admin/members" className="hover:text-red-200 font-medium transition">
                    Kelola Member
                  </Link>
                  <Link to="/create-class" className="hover:text-red-200 font-medium transition">
                    Tambah Jadwal
                  </Link>
                   <Link to="/admin-scan" className="hover:text-indigo-300 font-medium transition flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                    Scan Masuk
                    </Link>
                </>
              ) : (

                <>

                  {role && (
                    <>
                      <Link to="/dashboard" className="hover:text-indigo-300 transition">
                        Cari Kelas
                      </Link>
                      <Link to="/my-bookings" className="hover:text-indigo-300 transition">
                        Jadwal Saya
                      </Link>
                      <Link to="/profile" className="hover:text-indigo-300 transition">
                        Profil Saya
                      </Link>
                      <Link to="/tutorial" className="hover:text-indigo-300 font-medium transition">
                         Panduan Pemula
                      </Link>
                      <Link to="/classes" className="hover:text-indigo-300 font-medium transition">
                          Classes
                      </Link>
                      <Link to="/membership" className="hover:text-yellow-400 text-yellow-500 font-bold transition">
                        Beli Member
                      </Link>
                      
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="text-right hidden md:block">
                  <div className="text-sm font-medium">{user.username}</div>
                  <div className="text-xs text-gray-400 uppercase">{role}</div>
                </div>

                <button
                  onClick={handleLogout}
                  className={`${
                    role === "admin"
                      ? "bg-red-700 hover:bg-red-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  } px-4 py-2 rounded-md text-sm font-medium transition shadow-md`}
                >
                  Logout
                </button>
              </>
            ) : (

              <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded font-bold transition">
                 Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;