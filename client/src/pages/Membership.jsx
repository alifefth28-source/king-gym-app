import { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MySwal from '../utils/MySwal';

const Membership = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    

    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('https://king-gym-api.vercel.app/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCurrentUser(res.data);
            } catch (err) {
                console.error("Gagal load user info", err);
            }
        };
        if (token) fetchUser();
    }, [token]);

    const packages = [
        {
            type: 'Silver',
            duration: 30, 
            price: 'Rp 100.000',
            features: ['Berlaku 30 Hari', 'Akses Gym Terbatas', 'Tidak Dapat Loker'],
            color: 'bg-gray-400'
        },
        {
            type: 'Gold',
            duration: 90, 
            price: 'Rp 300.000',
            features: ['Berlaku 90 Hari', 'Akses Semua Kelas', 'Gratis Loker'],
            color: 'bg-yellow-500' 
        },
        {
            type: 'Platinum',
            duration: 365, 
            price: 'Rp 2.500.000',
            features: ['Berlaku 1 Tahun', 'Prioritas Booking', 'Gratis Handuk & Minum'],
            color: 'bg-slate-800' 
        }
    ];

    const handleBuy = async (pkg) => {
        let statusMessage = "";
        let alertColor = "#e5e7eb"; 
        let textColor = "#374151";

        if (currentUser && currentUser.membership_type) {
            if (currentUser.membership_type === pkg.type) {

                alertColor = "#dcfce7"; 
                textColor = "#166534"; 
                statusMessage = `
                    <div style="background: ${alertColor}; color: ${textColor}; padding: 10px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #86efac; font-size: 13px;">
                        <strong>PERPANJANG PAKET:</strong><br/>
                        Anda sudah berlangganan paket ini.<br/>
                        Masa aktif akan <b>ditambahkan (akumulasi)</b> ke sisa hari Anda.
                    </div>
                `;
            } else {
                alertColor = "#fee2e2"; 
                textColor = "#991b1b"; 
                statusMessage = `
                    <div style="background: ${alertColor}; color: ${textColor}; padding: 10px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #fca5a5; font-size: 13px;">
                        <strong>⚠️ GANTI PAKET:</strong><br/>
                        Anda saat ini member <b>${currentUser.membership_type}</b>.<br/>
                        Jika lanjut, masa aktif lama akan <b>HANGUS</b> dan direset mulai hari ini.
                    </div>
                `;
            }
        }

        const result = await Swal.fire({
            title: 'Checkout Membership',
            html: `
                <div style="text-align: left; font-size: 14px;">
                    
                    ${statusMessage}

                    <div style="background: #f3f4f6; padding: 10px; border-radius: 8px; margin-bottom: 15px;">
                        <p style="margin:0; color: #4b5563;">Paket yang dipilih:</p>
                        <h3 style="margin:0; font-weight: bold; color: #111827;">${pkg.type} Membership</h3>
                        <p style="margin:0; font-weight: bold; color: #4f46e5; font-size: 18px;">${pkg.price}</p>
                    </div>

                    <p style="margin-bottom: 5px; font-weight: bold;">Detail Pembayaran (Simulasi)</p>
                    <input id="card-number" class="swal2-input" placeholder="💳 Nomor Kartu (4242-xxxx-xxxx)" style="margin: 5px 0 10px 0; width: 100%;">
                    
                    <div style="display: flex; gap: 10px;">
                        <input id="card-expiry" class="swal2-input" placeholder="MM/YY" style="margin: 0; width: 50%;">
                        <input id="card-cvc" class="swal2-input" placeholder="CVC" style="margin: 0; width: 50%;">
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: `Bayar Sekarang`,
            confirmButtonColor: '#4f46e5', 
            cancelButtonText: 'Batal',
            showLoaderOnConfirm: true, 
            
            preConfirm: async () => {
                const card = document.getElementById('card-number').value;
                if (!card) {
                    Swal.showValidationMessage('Nomor kartu wajib diisi (bebas aja)!');
                    return;
                }

                try {
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    const res = await axios.post('https://king-gym-api.vercel.app/api/users/membership', 
                        { membershipType: pkg.type }, 
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    
                    return res.data; 

                } catch (err) {
                    Swal.showValidationMessage(
                        `Gagal Transaksi: ${err.response?.data?.message || err.message}`
                    );
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        });

        if (result.isConfirmed) {
            await MySwal.alert(
                'success', 
                'Pembayaran Berhasil!', 
                `Terima kasih! Paket ${pkg.type} Anda sudah aktif.`
            );
            navigate('/profile'); 
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
            <Navbar />
            
            <div className="max-w-7xl mx-auto py-12 px-4 text-center flex-grow w-full">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Pilih Paket Membership</h1>
                <p className="text-xl text-gray-500 mb-12">Investasi terbaik untuk tubuh Anda dimulai di sini.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg) => (
                        <div key={pkg.type} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col">
                            <div className={`${pkg.color} p-6`}>
                                <h3 className="text-2xl font-bold text-white">{pkg.type}</h3>
                            </div>
                            
                            <div className="p-8 flex-grow flex flex-col justify-between">
                                <div>
                                    <p className="text-4xl font-bold text-gray-800 mb-2">{pkg.price}</p>
                                    <p className="text-gray-500 mb-6">durasi {pkg.duration} hari</p>
                                    
                                    <ul className="text-left text-gray-600 space-y-3 mb-8">
                                        {pkg.features.map((feat, idx) => (
                                            <li key={idx} className="flex items-center">
                                                <span className="text-green-500 mr-2">✓</span> {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button 
                                    onClick={() => handleBuy(pkg)}
                                    className={`w-full py-3 px-6 rounded-lg font-bold text-white transition shadow-md
                                        ${pkg.type === 'Gold' ? 'bg-yellow-500 hover:bg-yellow-600' : 
                                          pkg.type === 'Platinum' ? 'bg-slate-800 hover:bg-slate-900' : 
                                          'bg-gray-500 hover:bg-gray-600'}`}
                                >
                                    Pilih {pkg.type}
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

export default Membership;