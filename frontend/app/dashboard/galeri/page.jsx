'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth';

export default function DashboardGaleri() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'photo',
    category: 'kegiatan',
  });

  useEffect(() => {
    const currentUser = authService.getUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    fetchGaleri();
  }, [router]);

  const fetchGaleri = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/galeri?limit=50`, {
        headers: { Authorization: `Bearer ${authService.getToken()}` },
      });
      const data = await response.json();
      if (data.success) setGaleri(data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('type', formData.type);
    form.append('category', formData.category);
    
    const fileInput = document.getElementById('image');
    if (fileInput.files[0]) {
      form.append('image', fileInput.files[0]);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/galeri`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${authService.getToken()}` },
        body: form,
      });
      const data = await response.json();
      if (data.success) {
        setShowForm(false);
        setFormData({ title: '', description: '', type: 'photo', category: 'kegiatan' });
        fetchGaleri();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin?')) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/galeri/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authService.getToken()}` },
      });
      const data = await response.json();
      if (data.success) fetchGaleri();
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
            <h1 className="text-2xl font-bold">Kelola Galeri</h1>
            <Link href="/dashboard" className="text-gray-300 hover:text-white">← Kembali</Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={() => setShowForm(!showForm)} className="btn-primary mb-6">
          {showForm ? 'Batal' : '+ Tambah Foto/Video'}
        </button>
        {showForm && (
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Tambah Item Galeri</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Judul" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              <textarea placeholder="Deskripsi" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                <option value="photo">Foto</option>
                <option value="video">Video</option>
              </select>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                <option value="kegiatan">Kegiatan</option>
                <option value="latihan">Latihan</option>
                <option value="acara">Acara</option>
                <option value="lomba">Lomba</option>
              </select>
              <input type="file" id="image" accept="image/*" className="w-full" />
              <button type="submit" className="btn-primary">Simpan</button>
            </form>
          </div>
        )}
        {loading ? (
          <div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-4 border-pramuka-primary border-t-transparent mx-auto"></div></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galeri.length === 0 ? <div className="col-span-full text-center py-12 text-gray-500">Belum ada foto/video</div> : 
              galeri.map((item) => (
                <div key={item._id} className="card overflow-hidden">
                  <div className="aspect-square relative">
                    {item.type === 'video' ? (
                      <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">Video</div>
                    ) : (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <span className="text-sm font-medium truncate">{item.title}</span>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 text-sm">Hapus</button>
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </main>
    </div>
  );
}

