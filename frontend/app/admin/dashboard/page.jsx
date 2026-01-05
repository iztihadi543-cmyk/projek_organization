"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function DashboardAdmin() {
  const [stats, setStats] = useState({ berita: 0, agenda: 0, anggota: 0 });
  const [recentBerita, setRecentBerita] = useState([]);
  const [adminName, setAdminName] = useState('Admin');
  const [loading, setLoading] = useState(true);

  // --- 1. INITIALIZE & FETCH DATA ---
  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Ambil Nama Admin dari Login
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setAdminName(parsed.name || parsed.nama || 'Admin');
      } catch (e) {
        console.error("Error parsing user", e);
      }
    }

    // Fetch Statistik
    const fetchData = async () => {
      try {
        // Kita gunakan Promise.all agar fetch jalan berbarengan (lebih cepat)
        const [resBerita, resAgenda] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/berita`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agenda`)
        ]);

        const dataBerita = await resBerita.json();
        const dataAgenda = await resAgenda.json();
        
        // Hitung Data
        const jumlahBerita = Array.isArray(dataBerita) ? dataBerita.length : 0;
        const jumlahAgenda = Array.isArray(dataAgenda) ? dataAgenda.length : 0;
        
        // Ambil 3 Berita Terakhir untuk ditampilkan
        const terbaru = Array.isArray(dataBerita) 
          ? dataBerita.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3) 
          : [];

        setStats({ berita: jumlahBerita, agenda: jumlahAgenda, anggota: 45 }); // Anggota statis dulu jika belum ada API
        setRecentBerita(terbaru);

      } catch (err) {
        console.error("Gagal memuat dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- WIDGET TANGGAL ---
  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50/50 pb-10">
      
      {/* HEADER SECTION */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4" data-aos="fade-down">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">{today}</p>
          <h1 className="text-3xl font-black text-gray-800">
            Halo, Kak <span className="text-red-600">{adminName}</span> 👋
          </h1>
          <p className="text-gray-500 mt-2">Selamat datang kembali di Panel Admin Ambalan.</p>
        </div>
        <div>
           <Link href="/" target="_blank" className="bg-white border border-gray-200 text-gray-600 px-5 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-gray-50 transition flex items-center gap-2">
             🌍 Lihat Website Utama
           </Link>
        </div>
      </div>

      {/* STATISTIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Card Berita */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 transform hover:-translate-y-1 transition duration-300 relative overflow-hidden group" data-aos="fade-up" data-aos-delay="0">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl transform rotate-12 group-hover:scale-110 transition">📰</div>
          <h3 className="text-blue-100 font-medium text-sm uppercase tracking-widest mb-1">Total Berita</h3>
          <div className="text-5xl font-black mb-4">{loading ? '...' : stats.berita}</div>
          <Link href="/admin/berita" className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-bold hover:bg-white hover:text-blue-800 transition">
            Kelola Berita &rarr;
          </Link>
        </div>

        {/* Card Agenda */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-6 text-white shadow-xl shadow-orange-200 transform hover:-translate-y-1 transition duration-300 relative overflow-hidden group" data-aos="fade-up" data-aos-delay="100">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl transform rotate-12 group-hover:scale-110 transition">📅</div>
          <h3 className="text-orange-100 font-medium text-sm uppercase tracking-widest mb-1">Agenda Aktif</h3>
          <div className="text-5xl font-black mb-4">{loading ? '...' : stats.agenda}</div>
          <Link href="/admin/agenda" className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-bold hover:bg-white hover:text-red-600 transition">
            Atur Jadwal &rarr;
          </Link>
        </div>

        {/* Card Anggota (Mockup) */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl p-6 text-white shadow-xl shadow-emerald-200 transform hover:-translate-y-1 transition duration-300 relative overflow-hidden group" data-aos="fade-up" data-aos-delay="200">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl transform rotate-12 group-hover:scale-110 transition">👥</div>
          <h3 className="text-emerald-100 font-medium text-sm uppercase tracking-widest mb-1">Total Anggota</h3>
          <div className="text-5xl font-black mb-4">{loading ? '...' : stats.anggota}</div>
          <button className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-bold cursor-not-allowed opacity-70">
            Segera Hadir
          </button>
        </div>

      </div>

      {/* BOTTOM SECTION: RECENT NEWS & QUICK ACTIONS */}
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Berita Terbaru */}
        <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay="300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">📝 Baru Ditambahkan</h3>
            <Link href="/admin/berita" className="text-sm text-red-600 font-bold hover:underline">Lihat Semua</Link>
          </div>
          
          <div className="space-y-4">
            {loading ? (
               <p className="text-gray-400 text-sm">Memuat data...</p>
            ) : recentBerita.length > 0 ? (
              recentBerita.map((item) => (
                <div key={item._id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100 group">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                    {item.gambar ? (
                      <img src={item.gambar} alt="img" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 line-clamp-1 group-hover:text-red-600 transition">{item.judul}</h4>
                    <p className="text-xs text-gray-500">
                      Oleh: <span className="font-medium">{item.penulis}</span> • {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link href="/admin/berita" className="text-gray-300 hover:text-red-600">✏️</Link>
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-2xl border-dashed border-2 border-gray-200">
                <p className="text-gray-400 text-sm">Belum ada berita yang ditulis.</p>
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Quick Actions */}
        <div className="space-y-6">
          
          {/* Quick Action Box */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100" data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🚀 Akses Cepat</h3>
            <div className="space-y-3">
              <Link href="/admin/berita" className="block w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-3 px-4 rounded-xl transition flex items-center gap-3">
                <span className="bg-white p-1 rounded-md shadow-sm">📰</span> Tulis Berita Baru
              </Link>
              <Link href="/admin/agenda" className="block w-full text-left bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold py-3 px-4 rounded-xl transition flex items-center gap-3">
                <span className="bg-white p-1 rounded-md shadow-sm">📅</span> Buat Agenda Baru
              </Link>
              <Link href="/admin/visi-misi" className="block w-full text-left bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold py-3 px-4 rounded-xl transition flex items-center gap-3">
                <span className="bg-white p-1 rounded-md shadow-sm">🎯</span> Update Visi Misi
              </Link>
            </div>
          </div>

          {/* Quote Card */}
          <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden" data-aos="fade-up" data-aos-delay="500">
             <div className="absolute top-0 right-0 opacity-10 text-9xl -mr-4 -mt-4">⚜️</div>
             <p className="font-serif italic text-lg opacity-90 mb-4">
               "Seorang Pramuka tidak pernah terkejut; dia tahu apa yang harus dilakukan ketika sesuatu yang tak terduga terjadi."
             </p>
             <p className="text-xs font-bold uppercase tracking-widest text-gray-400">— Baden Powell</p>
          </div>

        </div>

      </div>
    </div>
  );
}