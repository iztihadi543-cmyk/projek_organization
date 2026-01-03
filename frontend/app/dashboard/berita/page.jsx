// FILE: frontend/app/dashboard/berita/page.jsx
"use client";
import { useState, useEffect } from 'react';

export default function KelolaBerita() {
  const [dataBerita, setDataBerita] = useState([]);
  const [formData, setFormData] = useState({ judul: '', penulis: '', konten: '', gambar: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchBerita(); }, []);

  const fetchBerita = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/berita');
      const data = await res.json();
      setDataBerita(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/berita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('✅ Berita Terbit!');
        setFormData({ judul: '', penulis: '', konten: '', gambar: '' });
        fetchBerita();
      } else { alert('Gagal.'); }
    } catch (error) { alert('Error koneksi.'); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(!confirm('Hapus berita ini?')) return;
    await fetch(`http://localhost:5000/api/berita/${id}`, { method: 'DELETE' });
    fetchBerita();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📰 Kelola Berita</h2>
      
      {/* FORM */}
      <div className="bg-white p-6 rounded shadow mb-8 border-l-4 border-red-600">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Judul Berita" required className="w-full border p-2 rounded"
            value={formData.judul} onChange={(e) => setFormData({...formData, judul: e.target.value})} />
          <input type="text" placeholder="Penulis" required className="w-full border p-2 rounded"
            value={formData.penulis} onChange={(e) => setFormData({...formData, penulis: e.target.value})} />
          <input type="text" placeholder="Link Gambar (URL)" className="w-full border p-2 rounded"
            value={formData.gambar} onChange={(e) => setFormData({...formData, gambar: e.target.value})} />
          <textarea placeholder="Isi Berita..." required className="w-full border p-2 rounded h-32"
            value={formData.konten} onChange={(e) => setFormData({...formData, konten: e.target.value})}></textarea>
          <button type="submit" disabled={loading} className="bg-red-600 text-white py-2 px-6 rounded font-bold">
            {loading ? 'Menyimpan...' : 'TERBITKAN'}
          </button>
        </form>
      </div>

      {/* TABEL */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr><th className="p-4">Judul</th><th className="p-4">Penulis</th><th className="p-4">Aksi</th></tr>
          </thead>
          <tbody>
            {dataBerita.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{item.judul}</td>
                <td className="p-4">{item.penulis}</td>
                <td className="p-4"><button onClick={() => handleDelete(item._id)} className="text-red-500 font-bold border px-2 py-1 rounded hover:bg-red-50">Hapus</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}