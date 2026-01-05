"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KelolaBerita() {
  const router = useRouter();
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ judul: '', penulis: '', konten: '', gambar: '' });
  const [isEditing, setIsEditing] = useState(null);

  // --- FETCH DATA ---
  const fetchBerita = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/berita`);
      const data = await res.json();
      setBerita(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  // --- HANDLER ---
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    const url = isEditing 
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/berita/${isEditing}` 
      : `${process.env.NEXT_PUBLIC_API_URL}/api/berita`;
    
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        alert("Berhasil menyimpan data!");
        setForm({ judul: '', penulis: '', konten: '', gambar: '' });
        setIsEditing(null);
        fetchBerita();
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus berita ini?")) return;
    const token = localStorage.getItem('token');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/berita/${id}`, {
      method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchBerita();
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(item._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-2xl font-black text-gray-800">Kelola Berita</h1>
            <p className="text-gray-500 text-sm">Bagikan informasi terbaru kegiatan Ambalan.</p>
         </div>
         <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold text-sm">
            Total: {berita.length} Berita
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* FORM SECTION (KIRI) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-8">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              {isEditing ? '✏️ Edit Berita' : '📝 Tulis Berita Baru'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Judul Berita</label>
                <input type="text" name="judul" required value={form.judul} onChange={handleChange} className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Contoh: Kegiatan Persami 2024" />
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Penulis</label>
                <input type="text" name="penulis" required value={form.penulis} onChange={handleChange} className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Nama Admin" />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Link Gambar (URL)</label>
                <input type="text" name="gambar" value={form.gambar} onChange={handleChange} className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="https://..." />
                {/* Preview Image Kecil */}
                {form.gambar && (
                  <div className="mt-2 h-32 w-full bg-gray-100 rounded-lg overflow-hidden relative">
                    <img src={form.gambar} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                    <span className="absolute bottom-1 right-2 text-[10px] bg-black/50 text-white px-2 rounded">Preview</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Isi Konten</label>
                <textarea name="konten" rows="6" required value={form.konten} onChange={handleChange} className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Tulis detail berita di sini..."></textarea>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1 transition">
                  {isEditing ? 'Simpan Perubahan' : 'Publish Berita'}
                </button>
                {isEditing && (
                  <button type="button" onClick={() => {setIsEditing(null); setForm({judul:'', penulis:'', konten:'', gambar:''})}} className="bg-gray-200 text-gray-600 px-4 rounded-xl font-bold hover:bg-gray-300">
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* LIST SECTION (KANAN) */}
        <div className="lg:col-span-2">
           <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="p-6">Berita</th>
                      <th className="p-6 w-32">Penulis</th>
                      <th className="p-6 w-32 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? <tr><td colSpan="3" className="p-8 text-center text-gray-400">Memuat...</td></tr> : 
                     berita.length > 0 ? berita.map((item) => (
                      <tr key={item._id} className="hover:bg-blue-50/30 transition group">
                        <td className="p-6">
                           <div className="flex gap-4 items-center">
                             <div className="w-16 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                               <img src={item.gambar || 'https://placehold.co/100'} alt="img" className="w-full h-full object-cover" />
                             </div>
                             <div>
                               <h4 className="font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition">{item.judul}</h4>
                               <p className="text-xs text-gray-400 mt-1">{new Date(item.createdAt).toLocaleDateString()}</p>
                             </div>
                           </div>
                        </td>
                        <td className="p-6 text-sm font-medium text-gray-600">{item.penulis}</td>
                        <td className="p-6">
                          <div className="flex justify-center gap-2">
                             <button onClick={() => handleEdit(item)} className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition">✏️</button>
                             <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    )) : <tr><td colSpan="3" className="p-10 text-center text-gray-400 italic">Belum ada berita.</td></tr>}
                  </tbody>
                </table>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}