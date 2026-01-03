"use client";
import { useState, useEffect } from 'react';

export default function KelolaAgenda() {
  const [agenda, setAgenda] = useState([]);
  const [formData, setFormData] = useState({
    namaKegiatan: '',
    deskripsi: '',
    lokasi: '',
    tanggalMulai: '',
    status: 'akan datang'
  });
  const [loading, setLoading] = useState(false);

  // Ambil data saat halaman dibuka
  useEffect(() => {
    fetchAgenda();
  }, []);

  const fetchAgenda = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/agenda');
      const data = await res.json();
      setAgenda(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/agenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('✅ Agenda Berhasil Disimpan!');
        setFormData({ namaKegiatan: '', deskripsi: '', lokasi: '', tanggalMulai: '', status: 'akan datang' }); // Reset form
        fetchAgenda(); // Refresh tabel
      } else {
        alert('❌ Gagal menyimpan data');
      }
    } catch (error) {
      alert('⚠️ Error koneksi ke server');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📅 Kelola Agenda Kegiatan</h2>
      
      {/* --- FORM INPUT --- */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border-l-4 border-yellow-500">
        <h3 className="font-bold text-lg mb-4">Tambah Agenda Baru</h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="text-sm font-bold text-gray-600">Nama Kegiatan</label>
            <input type="text" required className="w-full border p-2 rounded mt-1"
              value={formData.namaKegiatan} onChange={(e)=>setFormData({...formData, namaKegiatan: e.target.value})} />
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <label className="text-sm font-bold text-gray-600">Lokasi</label>
            <input type="text" required className="w-full border p-2 rounded mt-1"
              value={formData.lokasi} onChange={(e)=>setFormData({...formData, lokasi: e.target.value})} />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-600">Tanggal & Jam Mulai</label>
            <input type="datetime-local" required className="w-full border p-2 rounded mt-1"
              value={formData.tanggalMulai} onChange={(e)=>setFormData({...formData, tanggalMulai: e.target.value})} />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-600">Status</label>
            <select className="w-full border p-2 rounded mt-1" value={formData.status} onChange={(e)=>setFormData({...formData, status: e.target.value})}>
              <option value="akan datang">Akan Datang</option>
              <option value="berlangsung">Sedang Berlangsung</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="text-sm font-bold text-gray-600">Deskripsi Singkat</label>
            <textarea required className="w-full border p-2 rounded mt-1" rows="3"
              value={formData.deskripsi} onChange={(e)=>setFormData({...formData, deskripsi: e.target.value})}></textarea>
          </div>
          
          <button type="submit" disabled={loading} className="col-span-2 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition">
            {loading ? 'Sedang Menyimpan...' : '+ SIMPAN KEGIATAN'}
          </button>
        </form>
      </div>

      {/* --- TABEL DATA --- */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 bg-gray-50 border-b font-bold text-gray-700">Daftar Agenda Tersimpan</div>
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b text-sm uppercase text-gray-500">
            <tr><th className="p-4">Kegiatan</th><th className="p-4">Tanggal</th><th className="p-4">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {agenda.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{item.namaKegiatan}</td>
                <td className="p-4 text-sm text-gray-600">
                  {new Date(item.tanggalMulai).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                </td>
                <td className="p-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${
                    item.status === 'selesai' ? 'bg-gray-200 text-gray-500' : 'bg-green-100 text-green-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
            {agenda.length === 0 && (
              <tr><td colSpan="3" className="p-8 text-center text-gray-400 italic">Belum ada data agenda.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}