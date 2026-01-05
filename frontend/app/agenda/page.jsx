"use client";

import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AgendaPage() {
  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. INISIALISASI AOS & FETCH DATA ---
  useEffect(() => {
    // Init AOS
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 100,
    });

    // Fetch Data
    const fetchData = async () => {
      try {
        // --- PERUBAHAN DI SINI (Gunakan Backtick ` ) ---
        // Mengambil URL dari .env.local agar dinamis
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agenda`);
        
        const result = await res.json();
        if (res.ok) {
          // Opsional: Urutkan agenda dari yang paling baru/dekat
          const sortedData = result.sort((a, b) => new Date(b.tanggalMulai) - new Date(a.tanggalMulai));
          setAgenda(sortedData);
        }
      } catch (error) {
        console.error("Gagal mengambil data agenda:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- HELPERS FORMAT TANGGAL ---
  const getDay = (dateString) => new Date(dateString).getDate();
  const getMonth = (dateString) => new Date(dateString).toLocaleString('id-ID', { month: 'short' }).toUpperCase();
  const getYear = (dateString) => new Date(dateString).getFullYear();
  const getTime = (dateString) => new Date(dateString).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const getFullDate = (dateString) => new Date(dateString).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  // --- LOADING STATE ---
  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      <p className="text-gray-500 font-bold animate-pulse">Memuat Jadwal...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 pb-24 font-sans overflow-x-hidden">
      
      {/* =========================================
          HERO HEADER (Modern Curved Red)
      ========================================= */}
      <div className="relative bg-gradient-to-b from-red-700 to-red-600 pt-24 pb-48 rounded-b-[60px] md:rounded-b-[100px] shadow-2xl z-0">
        <div className="absolute top-10 left-10 opacity-10 text-8xl transform -rotate-12 pointer-events-none">📅</div>
        <div className="absolute top-0 right-0 opacity-10 text-9xl transform translate-x-10 -translate-y-10 rotate-12 pointer-events-none">⛺</div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10" data-aos="zoom-in-down">
          <span className="bg-yellow-400 text-black px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 inline-block shadow-lg transform hover:scale-110 transition duration-300">
             Timeline Activities
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-xl tracking-tight uppercase">
            Agenda <span className="text-yellow-300">Kegiatan</span>
          </h1>
          <p className="text-red-100 text-lg md:text-2xl font-serif italic max-w-2xl mx-auto opacity-90">
            "Jadwal Latihan Rutin dan Acara Besar Ambalan"
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-32 relative z-10 space-y-8">
        
        {/* =========================================
            LIST AGENDA (Modern Cards)
        ========================================= */}
        {agenda.length > 0 ? (
          agenda.map((item, index) => {
            // Tentukan warna berdasarkan status
            const isFinished = item.status === 'selesai';
            const statusColor = isFinished ? 'bg-gray-200 text-gray-500 border-gray-300' : 'bg-green-100 text-green-700 border-green-200';
            const cardBorder = isFinished ? 'border-l-gray-400' : 'border-l-green-500';

            return (
              <div 
                key={item._id} 
                className={`group bg-white rounded-[2rem] p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 border-l-[12px] ${cardBorder} flex flex-col md:flex-row gap-6 md:gap-8 items-start relative overflow-hidden`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                
                {/* Dekorasi Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] opacity-50 pointer-events-none group-hover:bg-red-50 transition duration-500"></div>

                {/* --- BAGIAN TANGGAL (Calendar Box) --- */}
                <div className="flex-shrink-0 w-full md:w-auto flex md:flex-col items-center justify-center md:justify-start gap-3 md:gap-0">
                  <div className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center border-2 shadow-sm ${isFinished ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-white border-green-100 text-green-600'}`}>
                    <span className="text-xs font-bold uppercase tracking-widest">{getMonth(item.tanggalMulai)}</span>
                    <span className="text-4xl font-black leading-none my-1">{getDay(item.tanggalMulai)}</span>
                    <span className="text-xs font-bold text-gray-400">{getYear(item.tanggalMulai)}</span>
                  </div>
                  
                  {/* Jam (Mobile: Hidden, Desktop: Show below) */}
                  <div className="hidden md:block mt-3 text-center">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold font-mono">
                      {getTime(item.tanggalMulai)} WIB
                    </span>
                  </div>
                </div>

                {/* --- BAGIAN KONTEN --- */}
                <div className="flex-1 relative z-10 w-full">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    {/* Jam di Mobile */}
                    <span className="md:hidden bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold font-mono w-fit mb-2">
                      {getTime(item.tanggalMulai)} WIB
                    </span>
                    
                    {/* Status Badge */}
                    <span className={`px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide border w-fit ${statusColor}`}>
                      {item.status || 'Akan Datang'}
                    </span>
                  </div>

                  <h2 className={`text-2xl font-black mb-2 transition-colors ${isFinished ? 'text-gray-500' : 'text-gray-900 group-hover:text-red-600'}`}>
                    {item.namaKegiatan}
                  </h2>
                  
                  {/* Lokasi & Tanggal Lengkap */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4 font-medium">
                     <span className="flex items-center">
                       📍 {item.lokasi}
                     </span>
                     <span className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></span>
                     <span className="flex items-center">
                       📆 {getFullDate(item.tanggalMulai)}
                     </span>
                  </div>

                  <div className="w-full h-px bg-gray-100 mb-4"></div>

                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.deskripsi}
                  </p>
                </div>

              </div>
            );
          })
        ) : (
          // --- EMPTY STATE ---
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-xl border border-dashed border-gray-300" data-aos="zoom-in">
             <div className="text-6xl mb-4 opacity-30">🗓️</div>
             <h3 className="text-2xl font-black text-gray-400">Jadwal Kosong</h3>
             <p className="text-gray-400 text-sm mt-2">Belum ada agenda kegiatan yang ditambahkan.</p>
          </div>
        )}

      </div>
    </main>
  );
}