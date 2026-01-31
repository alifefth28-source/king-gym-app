import { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';

const AdminScan = () => {
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(true); // Untuk pause scan setelah berhasil
    const [history, setHistory] = useState([]); // Riwayat scan sesi ini

    const handleScan = async (result) => {
        if (!result || !isScanning) return;
        
        // Ambil data text dari hasil scan (library ini mengembalikan array)
        const rawValue = result[0]?.rawValue;
        if (!rawValue) return;

        // STOP SCANNING SEMENTARA (Supaya tidak spam request berkali-kali)
        setIsScanning(false);

        // Bunyikan Beep (Efek Suara)
        const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
        audio.play();

        try {
            // Kirim ke Backend
            const res = await axios.post('https://king-gym-api.vercel.app/api/auth/scan', { qrData: rawValue });
            const { status, member, message } = res.data;

            // TENTUKAN WARNA & ICON ALERT
            if (status === 'success') {
                await Swal.fire({
                    icon: 'success',
                    title: `Welcome, ${member.username}!`,
                    html: `
                        <div class="text-center">
                            <h3 class="text-2xl font-bold text-green-600 mb-2">AKSES DITERIMA</h3>
                            <p class="text-gray-600">Paket: <b>${member.membership_type}</b></p>
                            <p class="text-gray-500 text-sm">Sisa masa aktif aman.</p>
                        </div>
                    `,
                    timer: 2000,
                    showConfirmButton: false
                });
                addToHistory(member, 'Masuk', 'bg-green-100 text-green-800');

            } else if (status === 'expired') {
                await Swal.fire({
                    icon: 'warning',
                    title: 'STOP! Membership Expired',
                    text: message,
                    confirmButtonColor: '#d33'
                });
                addToHistory(member, 'Expired', 'bg-red-100 text-red-800');

            } else {
                await Swal.fire({ icon: 'error', title: 'Ditolak', text: message });
            }

        } catch (err) {
            console.error(err);
            await Swal.fire({
                icon: 'error',
                title: 'QR Code Tidak Valid',
                text: err.response?.data?.message || 'Data tidak dikenali sistem.'
            });
        } finally {
            // LANJUT SCAN LAGI SETELAH ALERT DITUTUP
            setTimeout(() => setIsScanning(true), 1000);
        }
    };

    const addToHistory = (member, status, colorClass) => {
        const newLog = {
            time: new Date().toLocaleTimeString(),
            name: member.username,
            status: status,
            color: colorClass
        };
        setHistory(prev => [newLog, ...prev]);
    };

    return (
        <div className="min-h-screen bg-gray-900 font-sans flex flex-col">
            <Navbar />

            <div className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
                
                {/* KOLOM KIRI: KAMERA SCANNER */}
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-indigo-500 relative w-full max-w-md aspect-square">
                        {/* KOMPONEN KAMERA */}
                        <Scanner 
                            onScan={handleScan} 
                            allowMultiple={true}
                            scanDelay={2000} // Delay antar scan
                            components={{
                                audio: false, // Kita pakai audio custom
                                finder: true // Kotak fokus
                            }}
                            styles={{
                                container: { width: '100%', height: '100%' }
                            }}
                        />
                        
                        {/* Overlay Text */}
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                            <p className="text-white bg-black/50 px-4 py-1 rounded-full inline-block text-sm animate-pulse">
                                {isScanning ? "📷 Arahkan QR Code Member ke Kamera..." : "⏳ Memproses..."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* KOLOM KANAN: LOG RIWAYAT SCAN (Live) */}
                <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[500px]">
                    <div className="bg-gray-800 p-4 border-b border-gray-700">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span>📡</span> Live Check-in Log
                        </h2>
                    </div>
                    
                    <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {history.length === 0 ? (
                            <div className="text-center text-gray-400 mt-20">
                                <p className="text-4xl mb-2">💤</p>
                                <p>Belum ada member yang scan hari ini.</p>
                            </div>
                        ) : (
                            history.map((log, idx) => (
                                <div key={idx} className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center border-l-4 border-indigo-500 animate-fade-in-down">
                                    <div>
                                        <p className="font-bold text-gray-800">{log.name}</p>
                                        <p className="text-xs text-gray-400">{log.time}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${log.color}`}>
                                        {log.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminScan;