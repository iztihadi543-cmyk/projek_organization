'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import authService from '@/services/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const user = authService.getUser();
    setIsLoggedIn(!!user);
    setUser(user);
  }, []);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/profil', label: 'Profil' },
    { href: '/struktur', label: 'Struktur' },
    { href: '/agenda', label: 'Agenda' },
    { href: '/berita', label: 'Berita' },
    { href: '/galeri', label: 'Galeri' },
    { href: '/kontak', label: 'Kontak' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-pramuka-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-pramuka-secondary rounded-full flex items-center justify-center">
              <span className="text-pramuka-dark font-bold text-xl">P</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">Pramuka</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-pramuka-secondary text-pramuka-dark'
                    : 'hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="ml-4 px-4 py-2 bg-pramuka-secondary text-pramuka-dark rounded-md text-sm font-medium hover:bg-yellow-400 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="ml-4 px-4 py-2 border border-pramuka-secondary text-pramuka-secondary rounded-md text-sm font-medium hover:bg-pramuka-secondary hover:text-pramuka-dark transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-pramuka-dark">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? 'bg-pramuka-secondary text-pramuka-dark'
                    : 'hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 mt-4 bg-pramuka-secondary text-pramuka-dark rounded-md text-center font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 mt-4 border border-pramuka-secondary text-pramuka-secondary rounded-md text-center font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

