"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function LoginPage() {
  const router = useRouter();
  
  // State untuk data input
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State untuk status (loading/error)
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // --- INISIALISASI AOS ---
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 50,
    });
  }, []);

  // Handle Perubahan Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // --- PERUBAHAN DI SINI (Gunakan Backtick ` ) ---
      // Menggunakan variabel environment agar dinamis (Localhost vs Online)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/admin/dashboard'); 
      } else {
        setError(data.message || 'Login gagal. Periksa email dan password.');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan koneksi server. Pastikan backend menyala.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans overflow-hidden relative">
      
      {/* =========================================
          BACKGROUND HEADER (Modern Curved Red)
      ========================================= */}
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-red-700 to-red-600 rounded-b-[60px] md:rounded-b-[100px] shadow-2xl z-0">
         {/* Dekorasi Background */}
         <div className="absolute top-10 left-10 opacity-10 text-9xl transform -rotate-12 pointer-events-none text-white">🔐</div>
         <div className="absolute top-20 right-20 opacity-10 text-9xl transform rotate-12 pointer-events-none text-white">⚜️</div>
      </div>

      {/* =========================================
          KONTEN UTAMA (Floating Card)
      ========================================= */}
      <div className="min-h-screen flex items-center justify-center relative z-10 px-4 py-10">
        
        <div 
          className="bg-white p-2 rounded-[2.5rem] shadow-2xl w-full max-w-md transform transition duration-500 hover:scale-[1.01]"
          data-aos="zoom-in-up"
        >
          <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 relative overflow-hidden">
            
            {/* Header Card */}
            <div className="text-center mb-8">
               {/* Logo */}
               <div className="w-24 h-24 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm p-4">
                 <Image
                   src="/logoarjunasrikandi.png" 
                   alt="Logo Arjuna Srikandi"
                   width={80}
                   height={80}
                   className="object-contain"
                 />
               </div>
               
               <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                 Admin <span className="text-red-600">Portal</span>
               </h1>
               <p className="text-gray-500 text-sm mt-2">Masuk untuk mengelola website Ambalan.</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg" data-aos="shake">
                <div className="flex">
                  <div className="flex-shrink-0 text-red-500">⚠️</div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 font-bold">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form Login */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Input Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@pramuka.com"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all font-medium placeholder-gray-400"
                />
              </div>

              {/* Input Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wider ml-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all font-medium placeholder-gray-400"
                />
              </div>

              {/* Tombol Login */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-black py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 transition transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    MEMPROSES...
                  </>
                ) : (
                  "MASUK DASHBOARD"
                )}
              </button>
            </form>

            {/* Footer Card */}
            <div className="mt-8 text-center">
              <Link href="/" className="text-sm font-bold text-gray-400 hover:text-red-600 transition flex items-center justify-center gap-2 group">
                <span className="group-hover:-translate-x-1 transition">←</span> Kembali ke Beranda
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="absolute bottom-6 w-full text-center text-gray-400 text-xs font-medium z-10">
        &copy; 2026 Ambalan Gajah Mada & Tribhuwana Tunggadewi. Restricted Area.
      </div>

    </main>
  );
}