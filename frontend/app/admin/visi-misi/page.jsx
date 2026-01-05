"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminVisiMisiPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('visimisi');

  const [formData, setFormData] = useState({
    visi: '',
    misi: [],
    programKerja: { pendek: [], menengah: [], panjang: [] }
  });

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/api/visimisi', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setFormData({
            visi: data.visi || '',
            misi: data.misi || [],
            programKerja: {
              pendek: data.programKerja?.pendek || [],
              menengah: data.programKerja?.menengah || [],
              panjang: data.programKerja?.panjang || []
            }
          });
        }
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  // HANDLERS
  const handleVisiChange = (e) => setFormData({ ...formData, visi: e.target.value });
  const handleMisiChange = (idx, field, val) => {
    const newMisi = [...formData.misi]; newMisi[idx][field] = val; setFormData({ ...formData, misi: newMisi });
  };
  const addMisi = () => setFormData({ ...formData, misi: [...formData.misi, { title: '', description: '', icon: '⚜️' }] });
  const removeMisi = (idx) => setFormData({ ...formData, misi: formData.misi.filter((_, i) => i !== idx) });

  const handleProkerChange = (period, idx, field, val) => {
    const newList = [...formData.programKerja[period]]; newList[idx][field] = val;
    setFormData({ ...formData, programKerja: { ...formData.programKerja, [period]: newList } });
  };
  const addProker = (period) => {
    setFormData({ ...formData, programKerja: { ...formData.programKerja, [period]: [...formData.programKerja[period], { nama: '', tanggal: '', sasaran: '', status: 'Belum Terlaksana' }] } });
  };
  const removeProker = (period, idx) => {
    const newList = formData.programKerja[period].filter((_, i) => i !== idx);
    setFormData({ ...formData, programKerja: { ...formData.programKerja, [period]: newList } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/visimisi', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) alert('✅ Data Berhasil Disimpan!');
    } catch (error) { alert('Gagal menyimpan.'); } finally { setSaving(false); }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Memuat data...</div>;

  const TabButton = ({ id, label, color }) => (
    <button type="button" onClick={() => setActiveTab(id)}
      className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-all border-b-4 
        ${activeTab === id ? `border-${color}-600 text-${color}-700 bg-${color}-50` : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
      {label}
    </button>
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Area Admin Pramuka</h1>
          <p className="text-sm text-gray-500">Edit Visi, Misi, dan Program Kerja</p>
        </div>
        <button onClick={handleSubmit} disabled={saving} className={`px-6 py-2 rounded-lg font-bold text-white shadow-lg transition ${saving ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}>
          {saving ? 'Menyimpan...' : 'SIMPAN PERUBAHAN 💾'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-100 bg-gray-50">
          <TabButton id="visimisi" label="1. Visi & Misi" color="red" />
          <TabButton id="pendek" label="2. Jangka Pendek" color="blue" />
          <TabButton id="menengah" label="3. Jangka Menengah" color="yellow" />
          <TabButton id="panjang" label="4. Jangka Panjang" color="gray" />
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit}>
            {activeTab === 'visimisi' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Visi Ambalan</label>
                  <textarea value={formData.visi} onChange={handleVisiChange} rows="3" className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Masukkan Visi..."></textarea>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-bold text-gray-700 uppercase">Daftar Misi</label>
                    <button type="button" onClick={addMisi} className="text-red-600 hover:text-red-800 text-sm font-bold bg-red-50 px-3 py-1 rounded">+ Tambah Misi</button>
                  </div>
                  {formData.misi.map((item, i) => (
                    <div key={i} className="flex gap-4 mb-4 items-start bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className="w-16"><input type="text" value={item.icon} onChange={(e)=>handleMisiChange(i,'icon',e.target.value)} className="w-full p-2 border rounded text-center text-xl" placeholder="Emoji" /></div>
                      <div className="flex-1 space-y-2">
                        <input type="text" value={item.title} onChange={(e)=>handleMisiChange(i,'title',e.target.value)} className="w-full p-2 border rounded font-bold" placeholder="Judul Misi" />
                        <textarea value={item.description} onChange={(e)=>handleMisiChange(i,'description',e.target.value)} rows="1" className="w-full p-2 border rounded text-sm" placeholder="Deskripsi..."></textarea>
                      </div>
                      <button type="button" onClick={()=>removeMisi(i)} className="text-gray-400 hover:text-red-500 pt-2">🗑️</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {['pendek', 'menengah', 'panjang'].map((period) => (
              activeTab === period && (
                <div key={period} className="animate-fade-in space-y-6">
                  <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                    <h3 className="font-bold text-gray-800 uppercase text-sm">Kegiatan {period}</h3>
                    <button type="button" onClick={()=>addProker(period)} className="bg-gray-800 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-black">+ Tambah Kegiatan</button>
                  </div>
                  {formData.programKerja[period].map((item, i) => (
                    <div key={i} className="p-4 rounded-lg border border-gray-200 bg-white relative group hover:shadow-md transition">
                       <button type="button" onClick={()=>removeProker(period, i)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500">✖</button>
                       <div className="grid md:grid-cols-4 gap-4">
                          <div className="md:col-span-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Nama Kegiatan</label>
                            <input type="text" value={item.nama} onChange={(e)=>handleProkerChange(period,i,'nama',e.target.value)} className="w-full p-2 border rounded bg-gray-50 font-semibold text-gray-800" />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Tanggal</label>
                            <input type="text" value={item.tanggal} onChange={(e)=>handleProkerChange(period,i,'tanggal',e.target.value)} className="w-full p-2 border rounded bg-gray-50 text-sm" />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Status</label>
                            <select value={item.status} onChange={(e)=>handleProkerChange(period,i,'status',e.target.value)} className={`w-full p-2 rounded border text-sm font-bold ${item.status === 'Terlaksana' ? 'text-green-600 bg-green-50 border-green-200' : 'text-yellow-600 bg-yellow-50 border-yellow-200'}`}>
                              <option value="Belum Terlaksana">⏳ Belum</option>
                              <option value="Terlaksana">✅ Selesai</option>
                              <option value="Tidak Terlaksana">❌ Batal</option>
                            </select>
                          </div>
                          <div className="md:col-span-4">
                             <label className="text-[10px] font-bold text-gray-400 uppercase">Sasaran</label>
                             <input type="text" value={item.sasaran} onChange={(e)=>handleProkerChange(period,i,'sasaran',e.target.value)} className="w-full p-2 border rounded bg-gray-50 text-sm" />
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              )
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}