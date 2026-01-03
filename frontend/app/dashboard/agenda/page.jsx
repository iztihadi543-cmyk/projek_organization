'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth';

export default function DashboardAgenda() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'acara',
  });

  useEffect(() => {
    const currentUser = authService.getUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    fetchAgenda();
  }, [router]);

  const fetchAgenda = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agenda?limit=50`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setAgenda(data.data);
      }
    } catch (error) {
      console.error('Error fetching agenda:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agenda`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authService.getToken()}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setShowForm(false);
        setFormData({ title: '', description: '', date: '', location: '', category: 'acara' });
        fetchAgenda();
      }
    } catch (error) {
      console.error('Error creating agenda:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus agenda ini?')) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agenda/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        fetchAgenda();
      }
    } catch (error) {
      console.error('Error deleting agenda:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-pramuka-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Kelola Agenda</h1>
              <p className="text-gray-300 text-sm">Tambah, edit, dan hapus agenda kegiatan</p>
            </div>
            <Link href="/dashboard" className="text-gray-300 hover:text-white">
              ← Kembali
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Batal' : '+ Tambah Agenda'}
          </button>
        </div>

        {showForm && (
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Tambah Agenda Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pramuka-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pramuka-primary"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                  <input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pramuka-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pramuka-primary"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pramuka-primary"
                >
                  <option value="acara">Acara</option>
                  <option value="latihan">Latihan</option>
                  <option value="pelatihan">Pelatihan</option>
                  <option value="rakor">Rapat Koordinasi</option>
                  <option value="lomba">Lomba</option>
                </select>
              </div>
              <button type="submit" className="btn-primary">Simpan Agenda</button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pramuka-primary border-t-transparent mx-auto"></div>
          </div>
        ) : (
          <div className="grid gap-4">
            {agenda.length === 0 ? (
              <div className="card p-12 text-center text-gray-500">
                Belum ada agenda
              </div>
            ) : (
              agenda.map((item) => (
                <div key={item._id} className="card p-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.location}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(item.date).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      item.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      item.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

