"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KelolaAgenda() {
  const router = useRouter();
  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ namaKegiatan: '', tanggalMulai: '', lokasi: '', deskripsi: '', status: 'Akan Datang' });
  const [isEditing, setIsEditing] = useState(null);

  // --- FETCH & SORT ---
  const fetchAgenda = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agenda`);
      const data = await res.json();
      setAgenda(Array.isArray(data) ? data.sort((a, b) => new Date(b.tanggalMulai) - new Date(a.tanggalMulai)) : []);
      setLoading(false);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAgenda(); }, []);

  // --- HANDLER ---
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    const url = isEditing 
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/agenda/${isEditing}` 
      : `${process.env.NEXT_PUBLIC_API_URL}/api/agenda`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(form)
      });
      if (res.ok) {
        alert("Agenda tersimpan!");
        setForm({ namaKegiatan: '', tanggalMulai: '', lokasi: '', deskripsi: '', status: 'Akan Datang' });
        setIsEditing(null);
        fetchAgenda();
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus agenda?")) return;
    const token = localStorage.getItem('token');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agenda/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }});
    fetchAgenda();
  };

  const handleEdit = (item) => {
    const dateObj = new Date(item.tanggalMulai);
    dateObj.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset());
    setForm({ ...item, tanggalMulai: dateObj.toISOString().slice(0, 16) });
    setIsEditing(item._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-2xl font-black text-gray-800">Jadwal Agenda</h1>
            <p className="text-gray-500 text-sm">Kelola timeline kegiatan pramuka.</p>
         </div>
         <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl font-bold text-sm">
            {agenda.length} Kegiatan
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* FORM (KIRI) */}
         <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-8">
               <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
                 {isEditing ? '✏️ Update Jadwal' : '📅 Buat Agenda Baru'}
               </h2>
               <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Nama Kegiatan</label>
                    <input type="text" name="namaKegiatan" required value={form.namaKegiatan} onChange={handleChange} className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Misal: Pelantikan Bantara" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Waktu Pelaksanaan</label>
                    <input type="datetime-local" name="tanggalMulai" required value={form.tanggalMulai} onChange={handleChange} className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Lokasi</label>
                    <input type="text" name="lokasi" required value={form.lokasi} onChange={handleChange} className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Misal: Halaman Sekolah" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Status</label>
                    <select name="status" value={form.status} onChange={handleChange} className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none">
                       <option value="Akan Datang">🟢 Akan Datang</option>
                       <option value="Selesai">🏁 Selesai</option>
                       <option value="Ditunda">🔴 Ditunda</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase">Deskripsi</label>
                    <textarea name="deskripsi" rows="3" required value={form.deskripsi} onChange={handleChange} className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Keterangan singkat..."></textarea>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-200 hover:shadow-xl hover:-translate-y-1 transition">
                       {isEditing ? 'Simpan' : 'Tambahkan'}
                    </button>
                    {isEditing && <button type="button" onClick={() => {setIsEditing(null); setForm({namaKegiatan:'', tanggalMulai:'', lokasi:'', deskripsi:'', status:'Akan Datang'})}} className="bg-gray-200 text-gray-600 px-4 rounded-xl font-bold">Batal</button>}
                  </div>
               </form>
            </div>
         </div>

         {/* TABLE (KANAN) */}
         <div className="lg:col-span-2">
            <div className="space-y-4">
              {loading ? <p className="text-center text-gray-400">Memuat...</p> : agenda.length > 0 ? agenda.map((item) => (
                 <div key={item._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-4 hover:shadow-md transition">
                    {/* Kotak Tanggal */}
                    <div className="bg-gray-100 rounded-xl p-4 text-center min-w-[80px]">
                       <div className="text-2xl font-black text-gray-800">{new Date(item.tanggalMulai).getDate()}</div>
                       <div className="text-xs font-bold text-gray-500 uppercase">{new Date(item.tanggalMulai).toLocaleString('id', { month: 'short' })}</div>
                    </div>
                    
                    {/* Konten */}
                    <div className="flex-1">
                       <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${item.status === 'Selesai' ? 'bg-gray-100 text-gray-500 border-gray-200' : item.status === 'Ditunda' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                             {item.status}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">⏰ {new Date(item.tanggalMulai).toLocaleTimeString('id', {hour:'2-digit', minute:'2-digit'})} WIB</span>
                       </div>
                       <h3 className="text-lg font-bold text-gray-800">{item.namaKegiatan}</h3>
                       <p className="text-sm text-gray-500">📍 {item.lokasi} <span className="mx-1">•</span> {item.deskripsi}</p>
                    </div>

                    {/* Aksi */}
                    <div className="flex gap-2">
                       <button onClick={() => handleEdit(item)} className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center hover:bg-yellow-100 transition">✏️</button>
                       <button onClick={() => handleDelete(item._id)} className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-100 transition">🗑️</button>
                    </div>
                 </div>
              )) : (
                 <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-gray-300">
                    <p className="text-gray-400">Belum ada agenda.</p>
                 </div>
              )}
            </div>
         </div>
      </div>
    </div>
  );
}