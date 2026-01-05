"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function StrukturPage() {
  // --- 1. INISIALISASI ANIMASI AOS (Settingan Baru) ---
  useEffect(() => {
    AOS.init({
      duration: 1000,      // Durasi animasi lebih lambat biar dramatis (1 detik)
      once: false,         // PENTING: Ubah ke false agar animasi main ulang saat scroll naik/turun
      mirror: true,        // Elemen akan animasi keluar saat scroll lewat
      anchorPlacement: 'top-bottom', // Animasi mulai saat bagian atas elemen masuk dari bawah layar
      offset: 100,
    });
  }, []);

  // --- DATA PENGURUS ---
  const pengurus = {
    mabigus: "Nama Kepala Sekolah",
    pembinaPa: "Nama Pembina Putra",
    pembinaPi: "Nama Pembina Putri",
    pradana: "Nama Pradana",
    pradani: "Nama Pradani",
    kerani: "Nama Kerani",
    juruUang: "Nama Bendahara",
    pemangkuAdat: "Nama Pemangku Adat"
  };

  // --- DATA SANGGA ---
  const daftarSangga = [
    {
      nama: "Sangga Perintis",
      imgSrc: "/perintis.png", 
      accent: "bg-red-600",
      pinsa: "Nama Pinsa Perintis",
      wapinsa: "Nama Wapinsa",
      anggota: ["Anggota 1", "Anggota 2", "Anggota 3", "Anggota 4"]
    },
    {
      nama: "Sangga Pencoba",
      imgSrc: "/pencoba.png",
      accent: "bg-gray-900", // Hitam
      pinsa: "Nama Pinsa Pencoba",
      wapinsa: "Nama Wapinsa",
      anggota: ["Anggota 1", "Anggota 2", "Anggota 3", "Anggota 4"]
    },
    {
      nama: "Sangga Pendobrak",
      imgSrc: "/pendobrak.png",
      accent: "bg-yellow-500",
      pinsa: "Nama Pinsa Pendobrak",
      wapinsa: "Nama Wapinsa",
      anggota: ["Anggota 1", "Anggota 2", "Anggota 3", "Anggota 4"]
    },
    {
      nama: "Sangga Pelaksana",
      imgSrc: "/pelaksana.png",
      accent: "bg-green-600",
      pinsa: "Nama Pinsa Pelaksana",
      wapinsa: "Nama Wapinsa",
      anggota: ["Anggota 1", "Anggota 2", "Anggota 3", "Anggota 4"]
    },
    {
      nama: "Sangga Penegas",
      imgSrc: "/penegas.png",
      accent: "bg-gray-700",
      pinsa: "Nama Pinsa Penegas",
      wapinsa: "Nama Wapinsa",
      anggota: ["Anggota 1", "Anggota 2", "Anggota 3", "Anggota 4"]
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 overflow-x-hidden font-sans">
      
      {/* =========================================
          HERO HEADER (Modern Curved)
      ========================================= */}
      <div className="relative bg-gradient-to-b from-red-700 to-red-600 pt-24 pb-48 rounded-b-[60px] md:rounded-b-[100px] shadow-2xl z-0">
        <div className="text-center px-4" data-aos="zoom-in-down">
          <span className="bg-yellow-400 text-black px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 inline-block shadow-lg transform hover:scale-110 transition duration-300">
            Masa Bhakti 2025/2026
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-xl tracking-tight">
            STRUKTUR ORGANISASI
          </h1>
          <p className="text-red-100 text-lg md:text-xl font-medium max-w-2xl mx-auto opacity-90">
            Ambalan Gajah Mada & Tribhuwana Tunggadewi
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10 pb-20">
        
        {/* =========================================
            LEVEL 1: MABIGUS (Pop-up Card Besar)
        ========================================= */}
        <div className="flex justify-center mb-20" data-aos="zoom-in-up">
          <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl w-full max-w-md transform transition duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
            <div className="bg-white rounded-[2rem] p-8 text-center border-2 border-gray-100 h-full flex flex-col items-center">
               {/* Badge Icon */}
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl mb-6 flex items-center justify-center text-5xl shadow-lg rotate-6 group-hover:rotate-0 transition duration-500">
                🎓
              </div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Pelindung & Penasihat</h3>
              <h2 className="text-3xl font-black text-gray-900 mb-3">{pengurus.mabigus}</h2>
              <div className="inline-block px-6 py-2 bg-red-100 text-red-700 rounded-full text-xs font-black tracking-wider shadow-inner">
                KAMABIGUS
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            LEVEL 2: PEMBINA (Kartu Kembar)
        ========================================= */}
        <div className="grid md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
          {/* Pembina PA */}
          <div 
            className="bg-white p-8 rounded-3xl shadow-xl border-l-[12px] border-red-600 flex items-center gap-6 hover:-translate-y-2 hover:shadow-2xl transition duration-300" 
            data-aos="fade-right" // Muncul dari kiri
          >
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center text-4xl shrink-0 shadow-inner text-red-600">
              👨‍🏫
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Pembina Putra</p>
              <h3 className="text-2xl font-black text-gray-900">{pengurus.pembinaPa}</h3>
            </div>
          </div>
          
          {/* Pembina PI */}
          <div 
            className="bg-white p-8 rounded-3xl shadow-xl border-r-[12px] border-black flex items-center flex-row-reverse text-right gap-6 hover:-translate-y-2 hover:shadow-2xl transition duration-300" 
            data-aos="fade-left" // Muncul dari kanan
          >
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl shrink-0 shadow-inner text-black">
              🧕
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Pembina Putri</p>
              <h3 className="text-2xl font-black text-gray-900">{pengurus.pembinaPi}</h3>
            </div>
          </div>
        </div>

        {/* =========================================
            LEVEL 3: DEWAN AMBALAN (Core Team)
        ========================================= */}
        <div className="mb-24">
           <div className="text-center mb-12" data-aos="zoom-in">
              <h2 className="text-4xl font-black text-gray-900 inline-block relative z-10 px-4">
                DEWAN AMBALAN
                <div className="absolute bottom-2 left-0 w-full h-4 bg-yellow-300 -z-10 opacity-70 transform -skew-x-12"></div>
              </h2>
           </div>

           {/* Pradana & Pradani */}
           <div className="grid md:grid-cols-2 gap-10 mb-12">
              {/* Pradana Card */}
              <div 
                className="bg-gradient-to-br from-red-600 to-red-800 rounded-[2.5rem] p-10 text-center text-white shadow-2xl relative overflow-hidden group hover:-translate-y-4 hover:shadow-red-900/50 transition duration-500"
                data-aos="zoom-in-up"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition duration-1000"></div>
                <div className="text-6xl mb-4 group-hover:scale-110 transition duration-300">🦅</div>
                <h3 className="text-yellow-300 font-bold tracking-[0.3em] text-xs mb-3">KETUA PUTRA</h3>
                <h2 className="text-4xl font-black mb-1">{pengurus.pradana}</h2>
                <p className="opacity-70 font-medium text-lg">Pradana</p>
              </div>
              
              {/* Pradani Card */}
              <div 
                className="bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-10 text-center text-white shadow-2xl relative overflow-hidden group hover:-translate-y-4 hover:shadow-black/50 transition duration-500"
                data-aos="zoom-in-up"
                data-aos-delay="200"
              >
                <div className="absolute top-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-16 -mt-16 group-hover:scale-150 transition duration-1000"></div>
                <div className="text-6xl mb-4 group-hover:scale-110 transition duration-300">🌺</div>
                <h3 className="text-yellow-300 font-bold tracking-[0.3em] text-xs mb-3">KETUA PUTRI</h3>
                <h2 className="text-4xl font-black mb-1">{pengurus.pradani}</h2>
                <p className="opacity-70 font-medium text-lg">Pradani</p>
              </div>
           </div>

           {/* Support Roles */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Kerani", name: pengurus.kerani, icon: "✍️", color: "text-red-600", delay: 0 },
                { label: "Juru Uang", name: pengurus.juruUang, icon: "💰", color: "text-yellow-600", delay: 150 },
                { label: "Pemangku Adat", name: pengurus.pemangkuAdat, icon: "⚖️", color: "text-black", delay: 300 }
              ].map((role, idx) => (
                <div 
                    key={idx} 
                    className="bg-white p-8 rounded-3xl shadow-lg border-b-8 border-gray-100 text-center hover:border-red-500 hover:-translate-y-2 transition duration-300"
                    data-aos="fade-up"
                    data-aos-delay={role.delay}
                >
                   <div className="text-4xl mb-4 transform group-hover:scale-110 transition">{role.icon}</div>
                   <h4 className={`text-xs font-bold uppercase ${role.color} mb-2 tracking-wider`}>{role.label}</h4>
                   <p className="font-bold text-gray-900 text-xl">{role.name}</p>
                </div>
              ))}
           </div>
        </div>

        {/* =========================================
            LEVEL 4: SANGGA (Modern Grid)
        ========================================= */}
        <div>
          <div className="flex items-center space-x-6 mb-16" data-aos="fade-up">
             <div className="h-1 bg-gray-200 flex-grow rounded-full"></div>
             <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight text-center">
               Unit <span className="text-red-600 bg-red-50 px-2 rounded-lg">Sangga</span>
             </h2>
             <div className="h-1 bg-gray-200 flex-grow rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {daftarSangga.map((sangga, index) => (
              <div 
                key={index}
                data-aos="zoom-in-up" // Efek Pop-up dari bawah
                data-aos-delay={index * 150} // Delay berurutan
                className="group bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition duration-500 flex flex-col overflow-hidden border border-gray-100 hover:-translate-y-3"
              >
                {/* Image Header */}
                <div className="relative p-10 bg-gray-50 text-center overflow-hidden">
                   <div className={`absolute top-0 left-0 w-full h-2 ${sangga.accent}`}></div>
                   {/* Background Circle Decoration */}
                   <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 ${sangga.accent.replace('bg-', 'bg-')}`}></div>
                   
                   <div className="relative w-28 h-28 mx-auto transform group-hover:scale-110 transition duration-500 drop-shadow-xl">
                      <Image 
                        src={sangga.imgSrc} 
                        alt={sangga.nama} 
                        fill 
                        className="object-contain"
                      />
                   </div>
                   <h3 className="mt-6 text-xl font-black text-gray-800 uppercase tracking-tight group-hover:text-red-600 transition">{sangga.nama}</h3>
                </div>

                {/* Content Body */}
                <div className="p-8 flex-grow flex flex-col">
                   {/* Pinsa/Wapinsa Row */}
                   <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm hover:shadow-md transition">
                      <div className="text-center w-1/2 border-r border-gray-100">
                         <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pinsa</span>
                         <span className="block text-sm font-bold text-red-600 truncate mt-1">{sangga.pinsa}</span>
                      </div>
                      <div className="text-center w-1/2">
                         <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Wapinsa</span>
                         <span className="block text-sm font-bold text-gray-900 truncate mt-1">{sangga.wapinsa}</span>
                      </div>
                   </div>

                   {/* Members List */}
                   <div className="mt-auto">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-3 ml-1 tracking-widest">Anggota Sangga</p>
                      <ul className="space-y-3">
                        {sangga.anggota.map((member, idx) => (
                          <li key={idx} className="flex items-center text-sm font-medium text-gray-600 bg-gray-50 px-4 py-3 rounded-xl group-hover:bg-red-50 group-hover:text-red-700 transition duration-300">
                            <span className={`w-2 h-2 rounded-full mr-3 ${sangga.accent}`}></span>
                            {member}
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}