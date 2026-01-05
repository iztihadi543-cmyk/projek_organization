"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Komponen Link Navigasi
  const NavLink = ({ href, children }) => {
    const isActive = pathname === href;
    return (
      <Link 
        href={href} 
        className={`${isActive ? 'text-red-600 font-bold' : 'text-gray-600'} hover:text-red-600 hover:bg-red-50 transition px-3 py-2 rounded-md text-sm uppercase tracking-wider font-medium`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="bg-white text-black shadow-md sticky top-0 z-50 border-b-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* --- BAGIAN LOGO --- */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              
              {/* Gambar Logo */}
              <Image 
                src="/logoarjunasrikandi.png" 
                alt="Logo Ambalan"
                width={50} 
                height={50}
                className="object-contain"
              />

              <div className="flex flex-col">
                <span className="font-extrabold text-lg leading-none tracking-widest transition">
                  <span className="text-red-600">ARJUNA</span>
                  <span className="text-black mx-2">-</span>
                  <span className="text-black">SRIKANDI</span>
                </span>
                <span className="text-xs text-gray-500 font-serif tracking-widest mt-1 group-hover:text-red-600 transition">
                  LANGKAH DIJAGA, HARKAT TAKTERCELA
                </span>
              </div>
            </Link>
          </div>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink href="/">Beranda</NavLink>
            <NavLink href="/visi-misi">Visi & Misi</NavLink>
            
            {/* --- MENU BARU: STRUKTUR --- */}
            <NavLink href="/struktur">Struktur</NavLink>
            {/* --------------------------- */}

            <NavLink href="/adat">Adat Ambalan</NavLink>
            <NavLink href="/berita">Berita</NavLink>
            <NavLink href="/agenda">Agenda</NavLink>
            {/* Menu Galeri DIHAPUS */}
            
            <div className="h-8 w-[1px] bg-gray-300 mx-4"></div>
            
            <Link href="/login" className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded font-bold transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              ADMIN
            </Link>
          </div>

          {/* TOMBOL MENU MOBILE */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none hover:text-red-600 transition">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE (Tampilan HP) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            <Link href="/" className="block px-3 py-3 hover:bg-red-50 text-gray-800 font-bold">BERANDA</Link>
            <Link href="/visi-misi" className="block px-3 py-3 hover:bg-red-50 text-gray-800">VISI & MISI</Link>
            
            {/* Menu Struktur Mobile */}
            <Link href="/struktur" className="block px-3 py-3 hover:bg-red-50 text-gray-800 font-bold text-red-600">STRUKTUR ORGANISASI</Link>
            
            <Link href="/adat" className="block px-3 py-3 hover:bg-red-50 text-gray-800">ADAT AMBALAN</Link>
            <Link href="/berita" className="block px-3 py-3 hover:bg-red-50 text-gray-800">BERITA</Link>
            <Link href="/agenda" className="block px-3 py-3 hover:bg-red-50 text-gray-800">AGENDA</Link>
            <Link href="/login" className="block mx-4 mt-4 bg-red-600 text-white py-3 rounded-lg font-bold shadow-md">LOGIN ADMIN</Link>
          </div>
        </div>
      )}
    </nav>
  );
}