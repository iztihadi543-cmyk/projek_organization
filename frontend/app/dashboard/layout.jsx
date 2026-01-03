// frontend/app/dashboard/layout.jsx
"use client"; // Tambahkan ini karena kita pakai useEffect

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // --- LOGIKA PROTEKSI HALAMAN ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      // Jika tidak ada token, tendang ke login
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return null; // Jangan tampilkan apa-apa sebelum pengecekan selesai
  }
  // -------------------------------

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full z-10">
        <div className="p-6 text-center border-b border-gray-800">
          <h2 className="text-2xl font-bold text-pramuka-yellow">ADMIN PANEL</h2>
          <p className="text-xs text-gray-400">Halo, {user.nama}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 text-sm">
          <Link href="/dashboard" className="block px-4 py-3 rounded hover:bg-gray-800 transition">
            📊 Dashboard
          </Link>
          <Link href="/dashboard/berita" className="block px-4 py-3 rounded hover:bg-gray-800 transition">
            📰 Kelola Berita
          </Link>
          <Link href="/dashboard/agenda" className="block px-4 py-3 rounded hover:bg-gray-800 transition">
            📅 Kelola Agenda
          </Link>
          <Link href="/dashboard/galeri" className="block px-4 py-3 rounded hover:bg-gray-800 transition">
            📷 Kelola Galeri
          </Link>
          {user.role === 'admin' && (
            <Link href="/dashboard/users" className="block px-4 py-3 rounded hover:bg-gray-800 transition text-pramuka-yellow">
              👥 Kelola User
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition font-bold"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* KONTEN KANAN */}
      <div className="flex-1 ml-64">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-0">
          <h1 className="text-xl font-bold text-gray-700">Area Admin Pramuka</h1>
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            Lihat Website Utama &rarr;
          </Link>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}