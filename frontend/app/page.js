"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const logoImg = "/logoarjunasrikandi.png";

  // --- INISIALISASI ANIMASI ---
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: false,      // Animasi berulang saat scroll naik/turun
      mirror: true,     // Efek saat scroll balik
      offset: 100,    
    });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden font-sans">
      
      {/* =========================================
          BAGIAN 1: HERO SECTION (Modern Curved Red)
      ========================================= */}
      <section className="relative bg-gradient-to-b from-red-700 to-red-600 min-h-[600px] flex items-center justify-center rounded-b-[60px] md:rounded-b-[100px] shadow-2xl z-10">
        
        {/* Background Pattern/Watermark */}
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
             <Image 
                src={logoImg} 
                alt="Background Pattern" 
                fill 
                className="object-cover grayscale scale-150 opacity-20" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-red-600 to-transparent"></div>
        </div>

        {/* Konten Utama */}
        <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center -mt-10">
          
          <span 
            data-aos="zoom-in-down"
            className="bg-yellow-400 text-black font-extrabold px-6 py-2 text-xs md:text-sm rounded-full mb-8 tracking-[0.2em] shadow-lg transform hover:scale-110 transition duration-300"
          >
            GUGUS DEPAN SMAN 1 SEKINCAU
          </span>
          
          <h1 
            data-aos="zoom-in"
            data-aos-delay="200"
            className="text-6xl md:text-8xl font-black text-white leading-tight mb-4 drop-shadow-xl"
          >
            ARJUNA <span className="text-yellow-300">SRIKANDI</span>
          </h1>
          
          {/* Garis Dekorasi */}
          <div data-aos="fade-in" data-aos-delay="400" className="w-40 h-2 bg-white mb-8 rounded-full opacity-50"></div>

          <p 
            data-aos="fade-up" 
            data-aos-delay="500"
            className="text-red-50 text-lg md:text-2xl mb-12 italic max-w-3xl leading-relaxed font-light"
          >
            "Membangun karakter pemuda yang berani karena benar, dan suci dalam pikiran, perkataan, dan perbuatan."
          </p>
          
          <div 
            data-aos="fade-up" 
            data-aos-delay="700"
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link href="/visi-misi" className="bg-white text-red-600 font-black py-4 px-12 rounded-full shadow-xl hover:bg-yellow-400 hover:text-black transition transform hover:-translate-y-2 hover:shadow-2xl text-sm tracking-wider">
              JELAJAHI PROFIL
            </Link>
            <Link href="/galeri" className="bg-transparent border-2 border-white text-white font-black py-4 px-12 rounded-full hover:bg-white hover:text-red-600 transition transform hover:-translate-y-2 hover:shadow-xl text-sm tracking-wider">
              LIHAT GALERI
            </Link>
          </div>

        </div>
      </section>


      {/* =========================================
          BAGIAN 2: NAVIGASI MENU (Clean Floating Cards)
      ========================================= */}
      <section className="py-24 bg-gray-50 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Judul Section (Floating Title) */}
          <div className="text-center mb-20" data-aos="fade-up">
            <div className="inline-block bg-white px-8 py-4 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                Jelajahi <span className="text-red-600">Ambalan</span>
                </h2>
                <div className="h-1 w-20 bg-yellow-400 mx-auto mt-2 rounded-full"></div>
            </div>
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg">
              Pilih menu di bawah ini untuk mengenal lebih dalam tentang Arjuna & Srikandi.
            </p>
          </div>

          {/* Grid Kartu */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            
            {/* KARTU 1: VISI MISI */}
            <Link href="/visi-misi" data-aos="zoom-in-up" data-aos-delay="0" className="group relative bg-white p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full transition-all duration-500 group-hover:scale-150 group-hover:bg-red-600 opacity-50 group-hover:opacity-10"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center text-4xl mb-8 text-red-600 transition-colors duration-500 group-hover:bg-red-600 group-hover:text-white shadow-sm">
                  🎯
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-red-600 transition-colors">Visi & Misi</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">
                  Mengetahui cita-cita luhur, tujuan, dan arah gerak ambalan di masa depan.
                </p>
                <div className="flex items-center text-red-600 font-bold text-sm tracking-wide group-hover:underline decoration-2 underline-offset-4">
                  Buka Halaman <span className="ml-2 transform group-hover:translate-x-2 transition duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* KARTU 2: STRUKTUR */}
            <Link href="/struktur" data-aos="zoom-in-up" data-aos-delay="150" className="group relative bg-white p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100 overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-full transition-all duration-500 group-hover:scale-150 group-hover:bg-yellow-500 opacity-50 group-hover:opacity-10"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-yellow-50 rounded-2xl flex items-center justify-center text-4xl mb-8 text-yellow-600 transition-colors duration-500 group-hover:bg-yellow-500 group-hover:text-white shadow-sm">
                  👔
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">Struktur</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">
                  Mengenal susunan pengurus Dewan Ambalan dan pembina yang menjabat.
                </p>
                <div className="flex items-center text-yellow-600 font-bold text-sm tracking-wide group-hover:underline decoration-2 underline-offset-4">
                  Buka Halaman <span className="ml-2 transform group-hover:translate-x-2 transition duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* KARTU 3: ADAT AMBALAN */}
            <Link href="/adat-ambalan" data-aos="zoom-in-up" data-aos-delay="300" className="group relative bg-white p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100 overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-bl-full transition-all duration-500 group-hover:scale-150 group-hover:bg-black opacity-50 group-hover:opacity-5"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl mb-8 text-black transition-colors duration-500 group-hover:bg-black group-hover:text-white shadow-sm">
                  📜
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-black transition-colors">Adat Ambalan</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">
                  Memahami tradisi, pusaka, dan aturan yang dijunjung tinggi.
                </p>
                <div className="flex items-center text-black font-bold text-sm tracking-wide group-hover:underline decoration-2 underline-offset-4">
                  Buka Halaman <span className="ml-2 transform group-hover:translate-x-2 transition duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* KARTU 4: BERITA */}
            <Link href="/berita" data-aos="zoom-in-up" data-aos-delay="450" className="group relative bg-white p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100 overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full transition-all duration-500 group-hover:scale-150 group-hover:bg-blue-600 opacity-50 group-hover:opacity-10"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl mb-8 text-blue-600 transition-colors duration-500 group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                  📰
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Berita</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">
                  Update informasi terbaru seputar kegiatan dan prestasi pramuka.
                </p>
                <div className="flex items-center text-blue-600 font-bold text-sm tracking-wide group-hover:underline decoration-2 underline-offset-4">
                  Buka Halaman <span className="ml-2 transform group-hover:translate-x-2 transition duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* KARTU 5: AGENDA */}
            <Link href="/agenda" data-aos="zoom-in-up" data-aos-delay="600" className="group relative bg-white p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100 overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full transition-all duration-500 group-hover:scale-150 group-hover:bg-green-600 opacity-50 group-hover:opacity-10"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center text-4xl mb-8 text-green-600 transition-colors duration-500 group-hover:bg-green-600 group-hover:text-white shadow-sm">
                  📅
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Agenda</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">
                  Jadwal latihan rutin, pelantikan, dan event besar yang akan datang.
                </p>
                <div className="flex items-center text-green-600 font-bold text-sm tracking-wide group-hover:underline decoration-2 underline-offset-4">
                  Buka Halaman <span className="ml-2 transform group-hover:translate-x-2 transition duration-300">→</span>
                </div>
              </div>
            </Link>
            
             {/* KARTU 6: LOGIN ADMIN */}
             <Link href="/login" data-aos="flip-up" data-aos-delay="750" className="group relative bg-gray-900 p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-800 overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gray-700 rounded-bl-full transition-all duration-500 group-hover:scale-150 group-hover:bg-white opacity-20 group-hover:opacity-10"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center text-4xl mb-8 text-white transition-colors duration-500 group-hover:bg-white group-hover:text-black shadow-sm border border-gray-700">
                  🔐
                </div>
                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-gray-300 transition-colors">Login Admin</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium">
                  Akses khusus pengurus untuk mengelola konten website.
                </p>
                <div className="flex items-center text-white font-bold text-sm tracking-wide group-hover:underline decoration-2 underline-offset-4">
                  Masuk Dashboard <span className="ml-2 transform group-hover:translate-x-2 transition duration-300">→</span>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* =========================================
          BAGIAN 3: BERITA & CTA (Modern Split)
      ========================================= */}
      <section className="bg-white py-24 relative overflow-hidden">
         {/* Dekorasi Background */}
         <div className="absolute top-0 left-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
         
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
            
            {/* Kiri: Info Terbaru */}
            <div data-aos="fade-right">
              <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-red-600 tracking-widest uppercase mb-1">Update Terkini</h3>
                  <h2 className="text-3xl font-black text-gray-900">BERITA & INFORMASI</h2>
                </div>
                <Link href="/berita" className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-600 hover:text-white transition text-xs">LIHAT SEMUA</Link>
              </div>

              <div className="space-y-6">
                {/* News Card */}
                <div className="flex bg-white p-5 rounded-2xl shadow-lg border border-gray-100 hover:border-red-200 transition cursor-pointer group hover:-translate-y-1">
                  <div className="w-24 h-24 relative rounded-xl flex-shrink-0 mr-6 overflow-hidden bg-gray-50">
                     <Image src={logoImg} alt="Thumbnail Berita" fill className="object-contain p-2 group-hover:scale-110 transition duration-500" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-black text-yellow-600 bg-yellow-50 px-2 py-1 rounded w-fit mb-2">12 AGUSTUS 2025</span>
                    <h4 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-red-600 transition line-clamp-2">
                        Persiapan Lomba Tingkat IV Daerah Menuju Nasional
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Kanan: CTA */}
            <div data-aos="zoom-in-left">
                <div className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-[2.5rem] p-12 relative overflow-hidden shadow-2xl text-center md:text-left group">
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white opacity-10 rounded-full group-hover:scale-125 transition duration-700"></div>

                    <div className="relative z-10">
                        <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 inline-block backdrop-blur-sm">PENDAFTARAN ANGGOTA BARU</span>
                        <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight">SIAP MENJADI BAGIAN DARI KAMI?</h3>
                        <p className="mb-10 text-red-100 text-lg">
                            Bergabunglah dengan Ambalan Gajah Mada. Tempa dirimu menjadi pribadi yang tangguh, disiplin, dan berkarakter.
                        </p>
                        
                        <button className="w-full md:w-auto bg-yellow-400 text-black font-black py-4 px-10 rounded-xl shadow-lg hover:bg-white hover:text-red-600 transition transform hover:-translate-y-1">
                            DAFTAR SEKARANG
                        </button>
                    </div>
                </div>
            </div>

         </div>
      </section>

    </main>
  );
}