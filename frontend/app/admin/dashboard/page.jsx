"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  // State untuk menyimpan angka statistik dummy
  const [stats, setStats] = useState({
    berita: 0,
    agenda: 0,
    users: 0
  });

  useEffect(() => {
    // Simulasi data sementara (Nanti bisa diganti dengan fetch API asli)
    setStats({
      berita: 12,
      agenda: 3,
      users: 45
    });
  }, []);

  return (
    <div className="w-full">
      
      {/* HEADER ATAS */}
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Area Admin Pramuka</h1>
          <p className="text-gray-500 text-sm mt-1">Selamat datang kembali, Kakak Admin!</p>
        </div>
        <Link href="/" target="_blank" className="text-red-600 hover:text-red-800 font-bold text-sm flex items-center">
          Lihat Website Utama →
        </Link>
      </div>

      {/* JUDUL SEKSI */}
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        Ringkasan Statistik <span className="ml-2 text-2xl">📊</span>
      </h2>

      {/* KARTU STATISTIK (GRID 3 KOLOM) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Kartu 1: Berita */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition border-l-4 border-red-500">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">TOTAL BERITA</p>
          <h3 className="text-4xl font-black text-gray-800">{stats.berita}</h3>
        </div>

        {/* Kartu 2: Agenda */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition border-l-4 border-yellow-500">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">AGENDA AKTIF</p>
          <h3 className="text-4xl font-black text-gray-800">{stats.agenda}</h3>
        </div>

        {/* Kartu 3: Anggota */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition border-l-4 border-blue-500">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">TOTAL ANGGOTA</p>
          <h3 className="text-4xl font-black text-gray-800">{stats.users}</h3>
        </div>

      </div>

      {/* KOTAK WELCOME MESSAGE (BIRU) */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-8">
        <h3 className="text-lg font-bold text-blue-800 mb-2">Selamat Datang di Admin Panel!</h3>
        <p className="text-blue-600 leading-relaxed">
          Gunakan menu di samping kiri (Sidebar) untuk mengelola Berita, Agenda, Visi Misi, dan Galeri.
          Pastikan untuk selalu mengecek data sebelum menyimpannya agar informasi di website utama selalu akurat.
        </p>
      </div>

    </div>
  );
}