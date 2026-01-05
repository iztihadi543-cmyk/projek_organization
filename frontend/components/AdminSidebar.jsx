"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navClass = (path) => 
    `flex items-center space-x-3 px-6 py-3 transition-all duration-200 border-l-4 ${
      pathname === path 
        ? 'bg-gray-800 border-red-500 text-white' 
        : 'border-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200'
    }`;

  return (
    <aside className="w-64 bg-[#0f172a] min-h-screen flex flex-col shadow-2xl z-20 sticky top-0">
      <div className="p-8 border-b border-gray-800 mb-6">
        <h2 className="text-2xl font-black text-white tracking-wider">ADMIN PANEL</h2>
        <p className="text-sm text-gray-500 mt-1">Halo, <span className="text-red-500 font-bold">Admin</span></p>
      </div>

      <nav className="flex-1 space-y-1">
        <Link href="/admin/dashboard" className={navClass('/admin/dashboard')}>
           <span>📊</span> <span className="font-medium">Dashboard</span>
        </Link>
        <Link href="/admin/berita" className={navClass('/admin/berita')}>
           <span>📰</span> <span className="font-medium">Kelola Berita</span>
        </Link>
        <Link href="/admin/agenda" className={navClass('/admin/agenda')}>
           <span>📅</span> <span className="font-medium">Kelola Agenda</span>
        </Link>
        <Link href="/admin/visi-misi" className={navClass('/admin/visi-misi')}>
           <span>🎯</span> <span className="font-medium">Kelola Visi Misi</span>
        </Link>
      </nav>

      <div className="p-6 border-t border-gray-800">
        <Link href="/logout" className="flex items-center space-x-3 text-red-400 hover:text-red-300 transition">
           <span>🚪</span> <span className="font-medium">Keluar</span>
        </Link>
      </div>
    </aside>
  );
}