"use client";
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function VisiMisiPublicPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 1. INISIALISASI AOS & FETCH DATA ---
  useEffect(() => {
    // Init AOS
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
      mirror: true,
    });

    // Fetch Data
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/visimisi');
        const result = await res.json();
        if (res.ok) {
          setData(result);
        }
      } catch (error) {
        console.error("Gagal koneksi ke server:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Tampilan Loading Modern
  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      <p className="text-gray-500 font-bold animate-pulse">Memuat Visi & Misi...</p>
    </div>
  );

  // Jika Data Kosong/Error
  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-10 bg-gray-50 rounded-3xl border border-gray-100 shadow-xl" data-aos="zoom-in">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-2xl font-black text-gray-800 mb-2">Data Belum Tersedia</h3>
        <p className="text-gray-500">Silakan hubungi Admin untuk menginput Visi & Misi.</p>
      </div>
    </div>
  );

  // Komponen Label Status (Modern Badge)
  const StatusBadge = ({ status }) => {
    let style = "bg-gray-100 text-gray-500 border-gray-200";
    if (status === "Terlaksana") style = "bg-green-100 text-green-700 border-green-200";
    else if (status === "Tidak Terlaksana") style = "bg-red-100 text-red-700 border-red-200";
    else if (status === "Belum Terlaksana") style = "bg-yellow-100 text-yellow-800 border-yellow-200";

    return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border tracking-wide ${style}`}>
        {status}
      </span>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 pb-24 overflow-x-hidden font-sans">
      
      {/* =========================================
          HERO HEADER (Modern Curved Red - Sama dengan Struktur)
      ========================================= */}
      <div className="relative bg-gradient-to-b from-red-700 to-red-600 pt-24 pb-48 rounded-b-[60px] md:rounded-b-[100px] shadow-2xl z-0">
        <div className="absolute top-0 right-0 opacity-10 text-9xl transform translate-x-10 -translate-y-10 rotate-12 pointer-events-none">⚜️</div>
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10" data-aos="zoom-in-down">
          <span className="bg-yellow-400 text-black px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 inline-block shadow-lg">
             Identity & Goals
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-xl tracking-tight uppercase">
            Arah & <span className="text-yellow-300">Tujuan</span>
          </h1>
          <p className="text-red-100 text-lg md:text-2xl font-serif italic max-w-2xl mx-auto opacity-90">
            "Satyaku Kudharmakan, Dharmaku Kubaktikan."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10 space-y-24">
        
        {/* =========================================
            1. VISI (Floating Giant Card)
        ========================================= */}
        <section className="text-center" data-aos="zoom-in-up">
          <div className="bg-white p-2 rounded-[3rem] shadow-2xl max-w-4xl mx-auto transform transition duration-500 hover:scale-[1.02]">
            <div className="bg-white rounded-[2.5rem] p-10 md:p-16 border-2 border-gray-50 flex flex-col items-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-4xl mb-6 text-red-600 shadow-inner">
                    🎯
                </div>
                <div className="inline-block bg-red-600 text-white px-8 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-8 shadow-md">
                    VISI AMBALAN
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-relaxed font-serif">
                    "{data.visi || 'Visi belum diisi'}"
                </h2>
            </div>
          </div>
        </section>

        {/* =========================================
            2. MISI (Grid Cards Modern)
        ========================================= */}
        <section>
          <div className="text-center mb-16" data-aos="fade-up">
            <h3 className="text-3xl md:text-4xl font-black uppercase text-gray-900 inline-block relative px-4">
              Misi <span className="text-red-600">Kami</span>
              <div className="absolute bottom-2 left-0 w-full h-3 bg-yellow-300 -z-10 opacity-50 transform -skew-x-12"></div>
            </h3>
            <p className="text-gray-500 mt-4">Langkah nyata untuk mewujudkan cita-cita luhur.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {data.misi && data.misi.length > 0 ? (
              data.misi.map((item, idx) => (
                <div 
                    key={idx} 
                    className="group bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex items-start space-x-6 overflow-hidden relative"
                    data-aos="fade-up"
                    data-aos-delay={idx * 150}
                >
                  {/* Dekorasi Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] opacity-50 transition duration-500 group-hover:scale-150 group-hover:bg-red-50"></div>
                  
                  <div className="text-4xl bg-gray-50 w-16 h-16 flex items-center justify-center rounded-2xl flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition duration-300 shadow-sm relative z-10">
                    {item.icon || '⚜️'}
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-red-600 transition">{item.title}</h4>
                    <p className="text-gray-500 leading-relaxed group-hover:text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-2 text-gray-400 italic bg-white p-8 rounded-xl border border-dashed border-gray-300">Belum ada misi yang ditambahkan.</p>
            )}
          </div>
        </section>

        {/* =========================================
            3. PROGRAM KERJA (Modern Columns)
        ========================================= */}
        <section className="pt-8">
           <div className="flex items-center space-x-6 mb-16" data-aos="fade-up">
                <div className="h-1 bg-gray-200 flex-grow rounded-full"></div>
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">
                    Agenda <span className="text-red-600 bg-red-50 px-2 rounded-lg">Kerja</span>
                    </h2>
                    <p className="text-gray-400 text-sm mt-2 font-medium tracking-wide">ROADMAP KEGIATAN AMBALAN</p>
                </div>
                <div className="h-1 bg-gray-200 flex-grow rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-start">
                
                {/* Helper Render Kolom */}
                {[
                { title: 'Jangka Pendek', color: 'red', data: data.programKerja.pendek, sub: 'Mingguan / Bulanan', delay: 0 },
                { title: 'Jangka Menengah', color: 'yellow', data: data.programKerja.menengah, sub: 'Per 3 - 6 Bulan', delay: 200 },
                { title: 'Jangka Panjang', color: 'black', data: data.programKerja.panjang, sub: 'Tahunan', delay: 400 }
                ].map((col, idx) => (
                <div 
                    key={idx} 
                    className="bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col h-full border border-gray-100 hover:shadow-2xl transition duration-500 group"
                    data-aos="zoom-in-up"
                    data-aos-delay={col.delay}
                >
                    {/* Header Kolom */}
                    <div className={`p-8 text-center relative overflow-hidden ${col.color === 'yellow' ? 'bg-yellow-400 text-black' : col.color === 'red' ? 'bg-red-600 text-white' : 'bg-gray-900 text-white'}`}>
                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        
                        <h3 className="text-xl font-black uppercase tracking-wider relative z-10">{col.title}</h3>
                        <p className={`text-xs mt-2 font-bold uppercase tracking-widest relative z-10 opacity-80 border rounded-full px-2 py-1 inline-block ${col.color === 'yellow' ? 'border-black/20' : 'border-white/20'}`}>
                            {col.sub}
                        </p>
                    </div>
                    
                    {/* Isi Daftar Program */}
                    <div className="p-6 space-y-4 bg-gray-50/30 flex-grow">
                    {col.data && col.data.length > 0 ? (
                        col.data.map((item, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-red-100 hover:shadow-md transition duration-300 group/item">
                            <div className="flex justify-between items-start mb-4">
                            <h4 className="font-bold text-gray-800 text-sm leading-snug group-hover/item:text-red-600 transition">{item.nama}</h4>
                            <StatusBadge status={item.status} />
                            </div>
                            
                            <div className="text-xs text-gray-500 space-y-2 pt-3 border-t border-gray-100 border-dashed">
                            <div className="flex items-center space-x-2">
                                <span className="bg-gray-100 p-1 rounded text-gray-600">📅</span>
                                <span className="font-medium text-gray-700">{item.tanggal}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="bg-gray-100 p-1 rounded text-gray-600">🎯</span>
                                <span className="font-medium text-gray-700">{item.sasaran}</span>
                            </div>
                            </div>
                        </div>
                        ))
                    ) : (
                        <div className="text-center py-12 flex flex-col items-center justify-center text-gray-400">
                            <div className="text-3xl mb-2 opacity-30">📝</div>
                            <span className="text-sm font-medium italic">Belum ada program.</span>
                        </div>
                    )}
                    </div>
                </div>
                ))}

            </div>
        </section>

      </div>
    </main>
  );
}