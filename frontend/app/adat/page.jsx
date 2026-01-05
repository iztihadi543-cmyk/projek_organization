"use client";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AdatPage() {
  const pdfUrl = "/adat-ambalan.pdf"; 

  // --- INISIALISASI ANIMASI AOS ---
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // Animasi berulang saat scroll naik/turun
      mirror: true,
      offset: 100,
    });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 pb-20 font-sans overflow-x-hidden">
      
      {/* =========================================
          HERO HEADER (Modern Curved Red)
      ========================================= */}
      <div className="relative bg-gradient-to-b from-red-700 to-red-600 pt-24 pb-48 rounded-b-[60px] md:rounded-b-[100px] shadow-2xl z-0">
        {/* Dekorasi Background Icon */}
        <div className="absolute top-10 left-10 opacity-10 text-9xl transform -rotate-12 pointer-events-none">📜</div>
        <div className="absolute top-0 right-0 opacity-10 text-9xl transform translate-x-10 -translate-y-10 rotate-12 pointer-events-none">⚜️</div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10" data-aos="zoom-in-down">
          <span className="bg-yellow-400 text-black px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 inline-block shadow-lg transform hover:scale-110 transition duration-300">
            Dokumen Resmi
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-xl tracking-tight uppercase">
            Adat <span className="text-yellow-300">Ambalan</span>
          </h1>
          <p className="text-red-100 text-lg md:text-2xl font-serif italic max-w-2xl mx-auto opacity-90">
            "Aturan, Tradisi, dan Pusaka yang Dijaga Bersama"
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-32 relative z-10 space-y-12">
        
        {/* =========================================
            PDF VIEWER CONTAINER (Floating Card)
        ========================================= */}
        <div className="bg-white p-2 md:p-4 rounded-[2.5rem] shadow-2xl transform transition duration-500 hover:-translate-y-2" data-aos="zoom-in-up">
           <div className="bg-gray-900 rounded-[2rem] overflow-hidden border-4 border-white shadow-inner relative">
              
              {/* Header Bar PDF Viewer */}
              <div className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
                 <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
                 <span className="text-gray-400 text-xs font-mono tracking-widest uppercase">preview_dokumen.pdf</span>
                 <div></div> 
              </div>

              {/* PDF Iframe */}
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-[500px] md:h-[800px] bg-white"
                title="Dokumen Adat Ambalan"
              >
                <div className="flex items-center justify-center h-full bg-white text-gray-500">
                   <p>Browser tidak mendukung penampil PDF.</p>
                </div>
              </iframe>

           </div>
        </div>

        {/* =========================================
            DOWNLOAD SECTION & INFO
        ========================================= */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
           
           {/* Tombol Download */}
           <div className="text-center md:text-left" data-aos="fade-right" data-aos-delay="200">
              <h3 className="text-2xl font-black text-gray-900 mb-2">UNDUH DOKUMEN</h3>
              <p className="text-gray-500 mb-6">Simpan salinan digital Adat Ambalan untuk dipelajari secara offline.</p>
              
              <a 
                href={pdfUrl} 
                download 
                className="group relative inline-flex items-center justify-center bg-red-600 text-white font-black py-4 px-10 rounded-full shadow-lg hover:bg-red-700 transition transform hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                <span className="relative flex items-center">
                   <span className="text-2xl mr-3 animate-bounce">📥</span> 
                   DOWNLOAD PDF
                </span>
              </a>
           </div>

           {/* Kartu Informasi Penting */}
           <div className="bg-yellow-50 border-l-8 border-yellow-400 p-8 rounded-r-2xl shadow-lg" data-aos="fade-left" data-aos-delay="400">
              <div className="flex items-start mb-4">
                 <div className="text-3xl mr-4">⚠️</div>
                 <h4 className="text-xl font-bold text-yellow-800 pt-1">PENTING DIKETAHUI</h4>
              </div>
              <p className="text-yellow-900 text-sm leading-relaxed opacity-90 font-medium">
                 Seluruh isi dokumen adat ini bersifat <strong>mengikat</strong> bagi seluruh warga Ambalan Gajah Mada & Tribhuwana Tunggadewi. Mohon dipelajari, dipahami, dan diamalkan sesuai dengan Satya dan Darma Pramuka dalam kehidupan sehari-hari.
              </p>
           </div>

        </div>

      </div>
    </main>
  );
}