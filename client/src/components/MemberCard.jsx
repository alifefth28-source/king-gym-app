
import { QRCodeSVG } from 'qrcode.react'; 

const MemberCard = ({ user }) => {

    const getCardStyle = () => {
        switch (user.membership_type) {
            case 'Gold':
                return "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white border-yellow-300";
            case 'Platinum':
                return "bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white border-gray-600";
            case 'Silver':
                return "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-gray-900 border-gray-300";
            default:
                return "bg-gray-200 text-gray-500"; 
        }
    };

    if (!user.membership_type) {
        return (
            <div className="bg-gray-100 p-6 rounded-2xl border-2 border-dashed border-gray-300 text-center">
                <p className="text-gray-500 font-medium">Anda belum memiliki Kartu Member.</p>
                <p className="text-sm text-gray-400 mt-1">Silakan beli membership untuk mendapatkan akses Gym.</p>
            </div>
        );
    }

    return (
        <div className={`relative w-full max-w-md mx-auto h-56 rounded-2xl shadow-2xl p-6 flex flex-col justify-between border-t-2 ${getCardStyle()} transition-all hover:scale-105 duration-300`}>

            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform rotate-45 pointer-events-none"></div>


            <div className="flex justify-between items-start z-10">
                <div>
                    <h3 className="text-2xl font-black italic tracking-wider">KING GYM</h3>
                    <p className="text-xs opacity-80 uppercase tracking-widest">Official Member Card</p>
                </div>
                <div className="text-right">
                    <span className="block text-lg font-bold uppercase">{user.membership_type}</span>
                    <span className="text-[10px] opacity-75">ACCESS PASS</span>
                </div>
            </div>


            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg shadow-sm">
                <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                    

                    <QRCodeSVG
                        value={`KINGGYM-${user.id}-${user.email}`}
                        size={128}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                    
                </div>
            </div>

            <div className="flex justify-between items-end z-10 mt-4">
                <div>
                    <p className="text-[10px] opacity-70 uppercase mb-0.5">Member Name</p>
                    <p className="font-bold text-lg leading-none truncate w-40">{user.username}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] opacity-70 uppercase mb-0.5">Valid Thru</p>
                    <p className="font-mono font-bold text-sm">
                        {user.membership_expiry 
                            ? new Date(user.membership_expiry).toLocaleDateString('id-ID', { month: '2-digit', year: '2-digit' }) 
                            : "**/**"
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MemberCard;