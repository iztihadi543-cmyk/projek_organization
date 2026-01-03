"use client";
import { useState, useEffect } from 'react';

export default function KelolaGaleri() {
  const [dataGaleri, setDataGaleri] = useState([]);
  const [formData, setFormData] = useState({
    judul: '',
    imageUrl: '',
    deskripsi: ''
  });
  const [loading, setLoading] = useState(false);

  // Ambil data saat halaman dibuka
  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/galeri');
      const data = await res.json();
      setDataGaleri(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gagal ambil foto:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/galeri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('✅ Foto Berhasil Disimpan!');
        setFormData({ judul: '', imageUrl: '', deskripsi: '' });
        fetchGaleri();
      } else {
        alert('❌ Gagal menyimpan foto');
      }
    } catch (error) {
      alert('⚠️ Error koneksi');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(!confirm('Hapus foto ini dari galeri?')) return;
    try {
      await fetch(`http://localhost:5000/api/galeri/${id}`, { method: 'DELETE' });
      fetchGaleri();
    } catch (error) {
      alert('Gagal menghapus');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📷 Kelola Galeri Dokumentasi</h2>
      
      {/* FORM INPUT */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border-l-4 border-blue-500">
        <h3 className="font-bold text-lg mb-4 text-gray-700">Tambah Foto Baru</h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-gray-600">Judul Foto</label>
              <input type="text" required placeholder="Kegiatan..." 
                className="w-full border p-2 rounded mt-1"
                value={formData.judul} onChange={(e) => setFormData({...formData, judul: e.target.value})} />
            </div>
            
            <div>
              <label className="text-sm font-bold text-gray-600">Link URL Gambar</label>
              <input type="text" required placeholder="https://..." 
                className="w-full border p-2 rounded mt-1"
                value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} />
              <p className="text-xs text-gray-400 mt-1">Copy link gambar (Klik kanan gambar di internet -&gt; Copy Image Link)</p>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600">Keterangan (Opsional)</label>
              <textarea placeholder="Deskripsi singkat..." className="w-full border p-2 rounded mt-1" rows="2"
                value={formData.deskripsi} onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}></textarea>
            </div>

            <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 px-6 rounded font-bold hover:bg-blue-700 w-full">
              {loading ? 'Menyimpan...' : '+ SIMPAN FOTO'}
            </button>
          </div>

          {/* Preview Gambar */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 h-64 overflow-hidden">
            {formData.imageUrl ? (
              <img src={formData.imageUrl} alt="Preview" className="h-full w-full object-cover" />
            ) : (
              <span className="text-gray-400">Preview Gambar</span>
            )}
          </div>

        </form>
      </div>

      {/* GRID FOTO */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dataGaleri.map((item) => (
          <div key={item._id} className="bg-white rounded shadow overflow-hidden group relative">
            <div className="h-40 overflow-hidden">
                <img src={item.imageUrl} alt={item.judul} className="h-full w-full object-cover" />
            </div>
            <div className="p-3">
              <h4 className="font-bold text-sm truncate">{item.judul}</h4>
              <button onClick={() => handleDelete(item._id)} 
                className="mt-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 w-full font-bold">
                HAPUS
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}