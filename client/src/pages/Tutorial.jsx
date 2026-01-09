import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Tutorial = () => {
  const workoutSplits = [
    {
      day: "Hari 1: Push (Dorong)",
      focus: "Dada, Bahu, Triceps",
      moves: ["Bench Press (3x10)", "Overhead Press (3x12)", "Incline Dumbbell Press (3x10)", "Tricep Pushdown (3x15)"],
      color: "bg-blue-50 border-blue-200 text-blue-800",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      day: "Hari 2: Pull (Tarik)",
      focus: "Punggung, Biceps",
      moves: ["Lat Pulldown (3x12)", "Seated Cable Row (3x12)", "Face Pull (3x15)", "Bicep Curl (3x12)"],
      color: "bg-green-50 border-green-200 text-green-800",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      )
    },
    {
      day: "Hari 3: Legs (Kaki)",
      focus: "Paha Depan, Belakang, Betis",
      moves: ["Squat (3x8)", "Leg Press (3x12)", "Leg Extension (3x15)", "Calf Raise (3x20)"],
      color: "bg-orange-50 border-orange-200 text-orange-800",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      )
    }
  ];


  const videos = [
    {
      title: "Cara Bench Press Benar",
      url: "https://www.youtube.com/embed/rT7DgCr-3pg", 
      desc: "Latihan fundamental untuk otot dada yang tebal."
    },
    {
      title: "Teknik Lat Pulldown",
      url: "https://www.youtube.com/embed/CAwf7n6Luuc", 
      desc: "Membentuk otot punggung agar terlihat V-Shape."
    },
    {
      title: "Squat untuk Pemula",
      url: "https://www.youtube.com/embed/YaXPRqUwItQ", 
      desc: "Raja dari semua latihan kaki. Perhatikan posisi lutut."
    }
  ];

  const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  );

  const CrossIcon = () => (
    <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  );

  const RunIcon = () => (
    <svg className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="bg-indigo-900 text-white py-16 px-4 text-center relative overflow-hidden">
        {/* Background Pattern SVG */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" fill="currentColor" viewBox="0 0 100 100">
           <path d="M0 0 L50 50 L0 100 Z" />
           <path d="M100 0 L50 50 L100 100 Z" />
        </svg>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight flex justify-center items-center gap-3 relative z-10">
          Panduan Pemula Gym
          {/* Icon Shield/Badge */}
          <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        </h1>
        <p className="text-indigo-200 text-lg max-w-2xl mx-auto relative z-10">
          Jangan bingung memulai! Berikut adalah panduan lengkap latihan, teknik, dan nutrisi untuk transformasi tubuh Anda.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-24 flex-grow">

        {/* --- POIN 1: JADWAL LATIHAN (SPLIT) --- */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-xl shadow-lg">1</div>
            <h2 className="text-3xl font-bold text-gray-900">Jadwal Latihan (Workout Split)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workoutSplits.map((split, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border-l-4 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white ${split.color.replace('text-', 'border-')}`}>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{split.day}</h3>
                    <div className={`${split.color.split(' ')[2]}`}> {/* Ambil warna text */}
                        {split.icon}
                    </div>
                </div>
                <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider font-semibold">{split.focus}</p>
                <ul className="space-y-3">
                  {split.moves.map((move, i) => (
                    <li key={i} className="flex items-center text-gray-700 text-sm">
                       {/* Icon Dot Kecil */}
                       <svg className="w-4 h-4 text-indigo-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                       </svg>
                       {move}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* --- POIN 2: VIDEO TUTORIAL --- */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-xl shadow-lg">2</div>
            <h2 className="text-3xl font-bold text-gray-900">Teknik Gerakan</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((vid, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-lg group border border-gray-100">
                <div className="aspect-w-16 aspect-h-9 w-full h-48 bg-black">
                   <iframe 
                      className="w-full h-full"
                      src={vid.url} 
                      title={vid.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                   ></iframe>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-indigo-600 transition flex items-center gap-2">
                    {/* Icon Play Kecil */}
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {vid.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{vid.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- POIN 3: NUTRISI & DIET --- */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-xl shadow-lg">3</div>
            <h2 className="text-3xl font-bold text-gray-900">Panduan Nutrisi & Diet</h2>
          </div>

          {/* MACROS DENGAN GAMBAR ASLI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* PROTEIN CARD */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition group">
              <div className="h-48 w-full overflow-hidden relative">
                <img 
                    src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=80" 
                    alt="Protein Source" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-extrabold text-white">Protein</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-4">Pembangun otot utama.</p>
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Ayam, Sapi, Telur, Whey
                </div>
              </div>
            </div>

            {/* CARBS CARD */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition group">
              <div className="h-48 w-full overflow-hidden relative">
                <img 
                    src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80" 
                    alt="Carbs Source" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-extrabold text-white">Karbohidrat</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-4">Sumber energi latihan.</p>
                <div className="bg-yellow-50 text-yellow-700 p-3 rounded-lg text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Nasi, Oat, Ubi, Pisang
                </div>
              </div>
            </div>

            {/* FATS CARD */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition group">
              <div className="h-48 w-full overflow-hidden relative">
                <img 
                    src="https://domf5oio6qrcr.cloudfront.net/medialibrary/5314/c27b66e3-ad9d-4512-8c5d-3101ed7af178.jpg" 
                    alt="Fat Source" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-extrabold text-white">Lemak Sehat</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-4">Hormon & sendi sehat.</p>
                <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Alpukat, Kacang, Zaitun
                </div>
              </div>
            </div>
          </div>

          {/* --- SUB-SECTION: POLA DIET (BULKING VS CUTTING) --- */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-bl-full opacity-50"></div>
            
            <div className="flex items-center justify-center gap-3 mb-8 relative z-10">
                {/* Target Icon SVG */}
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <h3 className="text-2xl font-bold text-gray-900">Pilih Target Kamu: Bulking vs Cutting</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {/* BULKING CARD */}
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                             {/* Trending Up Icon */}
                             <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                             </svg>
                             <h4 className="text-xl font-bold text-gray-800">Bulking (Massa Otot)</h4>
                        </div>
                        <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-bold">Surplus Kalori</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                        Makan lebih banyak dari kebutuhan harian untuk menambah ukuran otot.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start"><CheckIcon /> <span className="ml-1">Makan +300-500 kalori surplus.</span></li>
                        <li className="flex items-start"><CheckIcon /> <span className="ml-1">Perbanyak Karbo Kompleks.</span></li>
                        <li className="flex items-start"><CheckIcon /> <span className="ml-1">Latihan beban berat (8-12 Reps).</span></li>
                        <li className="flex items-start"><CrossIcon /> <span className="ml-1">Hindari kardio berlebihan.</span></li>
                    </ul>
                </div>

                {/* CUTTING CARD */}
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition">
                     <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                             {/* Fire Icon */}
                             <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
                             </svg>
                             <h4 className="text-xl font-bold text-gray-800">Cutting (Bakar Lemak)</h4>
                        </div>
                        <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-xs font-bold">Defisit Kalori</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                        Makan sedikit di bawah kebutuhan harian untuk membakar lemak (Sixpack).
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start"><CheckIcon /> <span className="ml-1">Kurangi -300-500 kalori.</span></li>
                        <li className="flex items-start"><CheckIcon /> <span className="ml-1">Tingkatkan Protein (2g/kg BB).</span></li>
                        <li className="flex items-start"><CheckIcon /> <span className="ml-1">Perbanyak Sayuran & Serat.</span></li>
                        <li className="flex items-start"><RunIcon /> <span className="ml-1">Wajib kardio 20 menit/hari.</span></li>
                    </ul>
                </div>
            </div>
          </div>

        </section>

      </div>
      <Footer />
    </div>
  );
};

export default Tutorial;