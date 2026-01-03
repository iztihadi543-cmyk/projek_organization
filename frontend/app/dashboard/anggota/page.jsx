'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth';

export default function DashboardAnggota() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [anggota, setAnggota] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    jabatan: '',
    kategori: 'anggota',
    status: 'aktif',
  });

  useEffect(() => {
    const currentUser = authService.getUser();
    if (!currentUser) { router.push('/login'); return; }
    setUser(currentUser);
    fetchAnggota();
  }, [router]);

  const fetchAnggota = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/anggota?limit=50`, {
        headers: { Authorization: `Bearer ${authService.getToken()}` },
      });
      const data = await response.json();
      if (data.success) setAnggota(data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/anggota`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authService.getToken()}` },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) { setShowForm(false); setFormData({ nama: '', jabatan: '', kategori: 'anggota', status: 'aktif' }); fetchAnggota(); }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin?')) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/anggota/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authService.getToken()}` },
      });
      const data = await response.json();
      if (data.success) fetchAnggota();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-pramuka-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Kelola Anggota</h1>
            <Link href="/dashboard" className="text-gray-300 hover:text-white">← Kembali</Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={() => setShowForm(!showForm)} className="btn-primary mb-6">{showForm ? 'Batal' : '+ Tambah Anggota'}</button>
        {showForm && (
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Tambah Anggota Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Nama" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              <input type="text" placeholder="Jabatan" value={formData.jabatan} onChange={(e) => setFormData({...formData, jabatan: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              <select value={formData.kategori} onChange={(e) => setFormData({...formData, kategori: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                <option value="pengurus">Pengurus</option>
                <option value="anggota">Anggota</option>
                <option value="alumni">Alumni</option>
              </select>
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
              </select>
              <button type="submit" className="btn-primary">Simpan</button>
            </form>
          </div>
        )}
        {loading ? (
          <div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-4 border-pramuka-primary border-t-transparent mx-auto"></div></div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jabatan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {anggota.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">Belum ada anggota</td></tr>
                ) : anggota.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{item.nama}</td>
                    <td className="px-6 py-4">{item.jabatan}</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs rounded-full bg-blue-100">{item.kategori}</span></td>
                    <td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded-full ${item.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>{item.status}</span></td>
                    <td className="px-6 py-4"><button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800 text-sm">Hapus</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

