"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterAdmin() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    role: 'admin' // Kita paksa jadi admin
  });
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('SUKSES! Akun Admin berhasil dibuat. Silakan Login.');
        router.push('/login');
      } else {
        alert('Gagal: ' + data.message);
      }
    } catch (error) {
      alert('Error koneksi ke server.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4 text-center">Buat Akun Admin</h1>
        
        <input 
          type="text" placeholder="Nama Lengkap" required 
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) => setFormData({...formData, nama: e.target.value})}
        />
        <input 
          type="email" placeholder="Email" required 
          className="w-full border p-2 mb-2 rounded"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" placeholder="Password" required 
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">
          DAFTAR ADMIN
        </button>
      </form>
    </div>
  );
}