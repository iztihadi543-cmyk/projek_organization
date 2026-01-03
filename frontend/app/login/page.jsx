// frontend/app/login/page.jsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Tembak API Login di Backend
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // 2. Jika Sukses, Simpan Token & Data User ke LocalStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        
        alert(`Selamat Datang, Kak ${data.nama}!`);
        
        // 3. Arahkan ke Dashboard
        router.push('/dashboard');
      } else {
        // Jika password salah
        setError(data.message || 'Login gagal');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border-t-4 border-pramuka-red">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Login Admin ⚜️</h1>
          <p className="text-gray-500 text-sm mt-2">Masuk untuk mengelola kegiatan & anggota</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="admin@pramuka.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-white font-bold py-3 rounded-lg transition duration-200 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-pramuka-red hover:bg-red-700'
            }`}
          >
            {loading ? 'Memproses...' : 'MASUK DASHBOARD'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link href="/" className="text-gray-400 hover:text-gray-600">
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}