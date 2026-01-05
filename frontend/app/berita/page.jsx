"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Menggunakan next/image untuk optimasi
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function BeritaPage() {
  const [dataBerita, setDataBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. INISIALISASI AOS & FETCH DATA ---
  useEffect(() => {
    // Init Animation
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 100,
    });

    // Fetch Data Berita
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/berita');
        const result = await res.json();
        if (res.ok) {
          setDataBerita(result);
        }
      } catch (error) {
        console.error("Gagal mengambil berita:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- FORMAT TANGGAL ---
  const formatTanggal = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // --- LOADING STATE ---
  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      <p className="text-gray-500 font-bold animate-pulse">Memuat Berita...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 pb-24 font-sans overflow-x-hidden">
      
      {/* =========================================
          HERO HEADER (Modern Curved Red)
      ========================================= */}
      <div className="relative bg-gradient-to-b from-red-700 to-red-600 pt-24 pb-48 rounded-b-[60px] md:rounded-b-[100px] shadow-2xl z-0">
        <div className="absolute top-10 left-10 opacity-10 text-8xl transform -rotate-12 pointer-events-none">📰</div>
        <div className="absolute top-0 right-0 opacity-10 text-9xl transform translate-x-10 -translate-y-10 rotate-12 pointer-events-none">📢</div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10" data-aos="zoom-in-down">
          <span className="bg-yellow-400 text-black px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 inline-block shadow-lg transform hover:scale-110 transition duration-300">
             News & Updates
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-xl tracking-tight uppercase">
            Kabar <span className="text-yellow-300">Pramuka</span>
          </h1>
          <p className="text-red-100 text-lg md:text-2xl font-serif italic max-w-2xl mx-auto opacity-90">
            "Informasi Terkini, Prestasi, dan Kegiatan Ambalan"
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-32 relative z-10">
        
        {/* =========================================
            GRID BERITA
        ========================================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {dataBerita.length > 0 ? (
            dataBerita.map((item, index) => (
              <div 
                key={item._id} 
                className="group bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={index * 150} // Animasi muncul berurutan
              >
                
                {/* --- GAMBAR BERITA --- */}
                <div className="h-56 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div> {/* Placeholder skeleton */}
                  
                  {/* Badge Tanggal Melayang */}
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-gray-800 shadow-md">
                    📅 {formatTanggal(item.createdAt)}
                  </div>

                  <img 
                    src={item.gambar && item.gambar.startsWith('http') ? item.gambar : "https://placehold.co/600x400?text=No+Image"} 
                    alt={item.judul} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                </div>

                {/* --- KONTEN --- */}
                <div className="p-8 flex-1 flex flex-col relative">
                  {/* Dekorasi Garis Atas */}
                  <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-red-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition duration-500 origin-left"></div>

                  {/* Penulis */}
                  <div className="flex items-center space-x-2 mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                     <span className="bg-red-50 text-red-600 px-2 py-1 rounded">👤 {item.penulis || "Admin"}</span>
                  </div>

                  {/* Judul */}
                  <h2 className="text-xl font-black mb-3 text-gray-900 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">
                    {item.judul}
                  </h2>
                  
                  {/* Deskripsi Singkat */}
                  <p className="text-gray-500 line-clamp-3 mb-6 text-sm leading-relaxed">
                    {item.konten}
                  </p>
                  
                  {/* Tombol Baca */}
                  <div className="mt-auto">
                    <button className="flex items-center text-sm font-black text-gray-900 group-hover:text-red-600 transition group/btn">
                      BACA SELENGKAPNYA 
                      <span className="ml-2 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center group-hover/btn:bg-red-600 group-hover/btn:text-white transition-all duration-300">
                        &rarr;
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // --- TAMPILAN JIKA KOSONG ---
            <div className="col-span-full py-20 text-center bg-white rounded-[3rem] shadow-xl border border-dashed border-gray-300" data-aos="zoom-in">
               <div className="text-6xl mb-4 opacity-30">📭</div>
               <h3 className="text-2xl font-black text-gray-400">Belum Ada Berita</h3>
               <p className="text-gray-400 text-sm mt-2">Nantikan informasi terbaru dari kami.</p>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}