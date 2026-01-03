// frontend/components/Navbar.jsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-green-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo / Judul Kiri */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-xl font-bold hover:text-green-200 transition">
              {/* GANTI TEKS DI BAWAH INI */}
              ⚜️ AMBALAN GAJAH MADA
            </Link>
          </div>

          {/* Menu Kanan */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <Link href="/" className="hover:text-green-300 transition">
              Beranda
            </Link>
            <Link href="/berita" className="hover:text-green-300 transition">
              Berita
            </Link>
            <Link href="/agenda" className="hover:text-green-300 transition">
              Agenda
            </Link>
            <Link href="/galeri" className="hover:text-green-300 transition">
              Galeri
            </Link>
            
            {/* Tombol Login */}
            <Link href="/login" className="bg-white text-green-800 px-4 py-2 rounded-full hover:bg-gray-100 transition text-sm font-bold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}