import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Classes = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();

  //Autoscroll
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const classesData = [
    {
      id: "body-pump",
      title: "Body Pump",
      tagline: "THE ORIGINAL BARBELL CLASS",
      description: "Latihan beban seluruh tubuh yang akan membakar kalori, membentuk otot, dan meningkatkan kekuatan inti Anda. Menggunakan beban ringan hingga sedang dengan repetisi tinggi.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
      color: "from-red-600 to-red-900",
      stats: [
        { label: "Durasi", value: "60 Min", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { label: "Kalori", value: "540 kcal", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg> },
        { label: "Intensitas", value: "Tinggi", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> }
      ]
    },
    {
      id: "yoga-flow",
      title: "Yoga Flow",
      tagline: "FIND YOUR BALANCE",
      description: "Gabungan gerakan yoga dinamis dengan pernapasan yang sinkron. Kelas ini meningkatkan fleksibilitas, keseimbangan, dan ketenangan pikiran. Cocok untuk recovery.",
      image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1469&auto=format&fit=crop",
      color: "from-teal-500 to-teal-800",
      stats: [
        { label: "Durasi", value: "45-60 Min", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { label: "Fokus", value: "Fleksibilitas", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
        { label: "Level", value: "Semua", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
      ]
    },
    {
      id: "pilates-plus",
      title: "Pilates+",
      tagline: "CORE STRENGTH REDEFINED",
      description: "Latihan low-impact yang fokus pada penguatan otot inti (core), perbaikan postur, dan toning otot. Menggunakan matras dan alat bantu ringan untuk hasil maksimal.",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop",
      color: "from-purple-500 to-purple-800",
      stats: [
        { label: "Durasi", value: "50 Min", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { label: "Benefit", value: "Postur Tegap", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
        { label: "Intensitas", value: "Sedang", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> }
      ]
    },
    {
      id: "muay-thai",
      title: "Muay Thai",
      tagline: "ART OF EIGHT LIMBS",
      description: "Kelas bela diri intensif yang membakar lemak dengan cepat. Pelajari teknik pukulan, tendangan, siku, dan lutut sambil meningkatkan stamina kardiovaskular Anda.",
      image: "https://www.teamplusone.com/wp-content/uploads/2019/06/plus-one-defense-systems-kickboxing-in-west-hartford-cardio-workout-1920x1280.jpg",
      color: "from-orange-600 to-orange-900",
      stats: [
        { label: "Durasi", value: "75 Min", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { label: "Kalori", value: "800+ kcal", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg> },
        { label: "Tipe", value: "Combat Cardio", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg> }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-black text-white py-12 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1375&auto=format&fit=crop" className="w-full h-full object-cover" alt="Gym Hero" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                World Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Programs</span>
            </h1>
            <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto">
                Temukan kelas yang sesuai dengan tujuan fitness Anda. Dari ketenangan Yoga hingga intensitas Muay Thai, kami punya semuanya.
            </p>
        </div>
      </div>

      {/* CLASS SECTIONS */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 space-y-12 md:space-y-24">
        {classesData.map((item, index) => (
            <div key={item.id} id={item.id} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative group">
                    <div className={`absolute -inset-4 bg-gradient-to-r ${item.color} rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition duration-500`}></div>
                    <div className="relative h-64 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 space-y-6">
                    <div className="inline-block px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold tracking-widest uppercase mb-2">
                        {item.tagline}
                    </div>
                    <h2 className="text-2xl md:text-5xl font-black text-gray-900 leading-tight">
                        {item.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {item.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100">
                        {item.stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className={`flex justify-center mb-2 text-${item.color.split('-')[1]}-600`}>
                                    {stat.icon}
                                </div>
                                <div className="font-bold text-gray-900">{stat.value}</div>
                                <div className="text-xs text-gray-500 uppercase">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={() => {
                            window.scrollTo(0, 0); 
                            navigate('/dashboard');
                        }}
                        className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r ${item.color} hover:shadow-xl hover:-translate-y-1 transition transform flex items-center justify-center gap-2`}
                    >
                        Cek Jadwal {item.title}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                </div>
            </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Classes;