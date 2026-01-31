import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Reveal } from '../components/Reveal';


const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [destination, setDestination] = useState('/login'); 

   
    useEffect(() => {
       
        const token = localStorage.getItem('token');
        if (token) {
           
            setDestination('/membership');
        } else {
            
            setDestination('/login');
        }
    }, []);

    // --- DATACAROUSEL ---
    const slides = [
        {
            url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
            title: "TRAIN LIKE A KING",
            subtitle: "Fasilitas Gym Terlengkap & Modern di Kota Ini"
        },
        {
            url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1375&auto=format&fit=crop",
            title: "EXPERT TRAINERS",
            subtitle: "Dibimbing Langsung oleh Coach Profesional Bersertifikat"
        },
        {
            url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop",
            title: "JOIN THE COMMUNITY",
            subtitle: "Lingkungan Positif untuk Mencapai Body Goals Anda"
        }
    ];

    const trainers = [
        { 
            name: "Coach Roni", 
            role: "Strength Coach", 
            img: "/images/PT1.png" 
        },
        { 
            name: "Coach Sarah", 
            role: "Yoga Expert", 
            img: "/images/PT2.png" 
        },
        { 
            name: "Coach Radja", 
            role: "Bodybuilding", 
            img: "/images/PT4.jpeg" 
        },
        { 
            name: "Coach Grace", 
            role: "HIIT Specialist", 
            img: "/images/PT3.png" 
        },
    ];

    //AUTO SLIDE 
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(slideInterval);
    }, [slides.length]);

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col">
            <Navbar />

            {/*CAROUSEL*/}
            <div className="relative h-[600px] w-full overflow-hidden">
                {slides.map((slide, index) => (
                    <div 
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
                            ${index === currentSlide ? 'opacity-100' : 'opacity-0'}
                        `}
                    >
                        <img 
                            src={slide.url} 
                            alt="Gym Slide" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
                                {slide.title}
                            </h1>
                            <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl drop-shadow-md">
                                {slide.subtitle}
                            </p>
                            
                            <Link 
                                to={destination} 
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition transform hover:scale-105 shadow-xl"
                            >
                                Mulai Latihan Sekarang 
                            </Link>
                        </div>
                    </div>
                ))}
                
                <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                index === currentSlide ? "bg-white scale-125" : "bg-gray-400"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/*FACILITIES*/}
            <div className="py-20 px-4 max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Fasilitas Premium</h2>
                <p className="text-gray-500 mb-12 text-lg">Semua yang Anda butuhkan untuk membentuk tubuh impian.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1469&auto=format&fit=crop" alt="Gym Equipment" className="w-full h-64 object-cover transition duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 flex items-end p-6">
                            <h3 className="text-white text-xl font-bold">Alat Modern & Lengkap</h3>
                        </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer">
                        <img src="https://fithub.id/_next/image?url=https%3A%2F%2Fphoto-fhad-fithub.s3.ap-southeast-1.amazonaws.com%2Fclass_area_853c73c79d.jpeg&w=1920&q=75" alt="Yoga Class" className="w-full h-64 object-cover transition duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 flex items-end p-6">
                            <h3 className="text-white text-xl font-bold">Studio Kelas Luas</h3>
                        </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1561214078-f3247647fc5e?q=80&w=1470&auto=format&fit=crop" alt="Locker Room" className="w-full h-64 object-cover transition duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 flex items-end p-6">
                            <h3 className="text-white text-xl font-bold">Loker & Sauna Mewah</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* GALLERY*/}
            <div className="bg-gray-50 py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Intip Gym Kami</h2>
                        <p className="text-gray-500 text-lg">Suasana latihan yang nyaman, bersih, dan memotivasi.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
                        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl shadow-lg">
                            <img src="https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=1428&auto=format&fit=crop" alt="Gym Exterior Interior" className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-4 w-full translate-y-full group-hover:translate-y-0 transition duration-300">
                                <p className="font-bold">Main Gym Area</p>
                            </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                            <img src="https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1374&auto=format&fit=crop" alt="Cardio Area" className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                             <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-2 w-full translate-y-full group-hover:translate-y-0 transition duration-300">
                                <p className="text-sm font-bold">Cardio Zone</p>
                            </div>
                        </div>
                        <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                            <img src="https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1471&auto=format&fit=crop" alt="Weights" className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-2 w-full translate-y-full group-hover:translate-y-0 transition duration-300">
                                <p className="text-sm font-bold">Free Weights</p>
                            </div>
                        </div>
                        <div className="md:col-span-2 relative group overflow-hidden rounded-2xl shadow-lg">
                            <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop" alt="Functional Training" className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-4 w-full translate-y-full group-hover:translate-y-0 transition duration-300">
                                <p className="font-bold">CrossFit & Functional Area</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- SECTION 4: TRAINERS --- */}
            <div className="bg-black py-24 px-4 text-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    
                    {/* Bagian Kiri: Text & Tombol */}
                    <div className="md:w-1/3 space-y-8">
                        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            Meet our Certified <br/> <span className="text-indigo-500">Personal Trainers</span>
                        </h2>
                        
                        <div className="flex items-center space-x-4 opacity-80">
                            <span className="font-bold border border-gray-600 px-2 py-1 text-xs rounded">NASM</span>
                            <span className="font-bold border border-gray-600 px-2 py-1 text-xs rounded">ISSA</span>
                            <span className="font-bold border border-gray-600 px-2 py-1 text-xs rounded">ACE</span>
                        </div>

                        <p className="text-gray-400 text-lg leading-relaxed">
                            Setiap sesi dipandu oleh pelatih bersertifikat nasional & internasional. 
                            Capai target Anda mulai dari 
                            <span className="text-white font-semibold"> Weight Loss</span>, 
                            <span className="text-white font-semibold"> Muscle Building</span>, hingga 
                            <span className="text-white font-semibold"> Rehabilitation</span>.
                        </p>

                        {/* TOMBOL TRAINER: DINAMIS (Login/Membership) */}
                        <Link 
                            to={destination} 
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full transition shadow-lg transform hover:-translate-y-1"
                        >
                            Join Now
                        </Link>
                    </div>
                     

                    {/* Bagian Kanan: Grid Foto Trainer */}
                    <div className="md:w-2/3 w-full">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {trainers.map((trainer, idx) => (
                                <Reveal>
                                <div key={idx} className="relative group overflow-hidden rounded-xl bg-gray-900 shadow-2xl border border-gray-800">
                                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-transparent to-transparent opacity-80"></div>
                                    
                                    <img 
                                        src={trainer.img} 
                                        alt={trainer.name} 
                                        className="w-full h-80 object-cover object-top transition duration-500 group-hover:scale-105 mix-blend-overlay group-hover:mix-blend-normal"
                                    />
                                    
                                    <div className="absolute bottom-4 left-4 z-10">
                                        <p className="text-white font-bold text-lg">{trainer.name}</p>
                                        <p className="text-indigo-300 text-xs font-semibold tracking-wider uppercase">{trainer.role}</p>
                                    </div>
                                </div>
                                 </Reveal>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* --- SECTION 5: FOOTER --- */}
            <Footer />
        </div>
    );
};

export default Home;