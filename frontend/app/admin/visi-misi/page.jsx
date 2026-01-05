"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KelolaVisiMisi() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dataId, setDataId] = useState(null);
  const [visi, setVisi] = useState('');
  const [misiText, setMisiText] = useState('');

  // --- FETCH ---
  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visimisi`);
      const data = await res.json();
      const currentData = Array.isArray(data) ? data[0] : data;
      if (currentData) {
        setDataId(currentData._id);
        setVisi(currentData.visi || '');
        if (currentData.misi && Array.isArray(currentData.misi)) {
          setMisiText(currentData.misi.map(m => m.title || m).join('\n'));
        }
      }
      setLoading(false);
    } catch (err) { console.error(err); setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    const misiArray = misiText.split('\n').filter(line => line.trim() !== '').map(line => ({ title: line, description: '', icon: '⚜️' }));
    const payload = { visi, misi: misiArray };
    let url = dataId ? `${process.env.NEXT_PUBLIC_API_URL}/api/visimisi/${dataId}` : `${process.env.NEXT_PUBLIC_API_URL}/api/visimisi`;
    let method = dataId ? 'PUT' : 'POST'; // Backend mungkin perlu penyesuaian jika create baru selalu POST

    // Fallback: Jika endpoint create/update sama (misal POST handle both), gunakan POST
    // Tapi biasanya Update pakai PUT + ID. Kita pakai logika standar REST API.
    
    try {
        const res = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(payload)
        });
        if (res.ok) { alert("Visi & Misi diperbarui!"); fetchData(); }
    } catch (e) { console.error(e); }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Memuat data...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      
      {/* HEADER */}
      <div className="text-center mb-10">
         <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Visi & Misi Ambalan</h1>
         <p className="text-gray-500 mt-2">Pondasi utama organisasi. Pastikan isinya sesuai dengan AD/ART.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden relative">
        {/* Dekorasi Atas */}
        <div className="h-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400"></div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
           
           {/* SECTION VISI */}
           <div className="relative">
              <div className="absolute -left-12 top-0 text-gray-50 text-9xl font-black pointer-events-none select-none opacity-50">01</div>
              <label className="block text-lg font-black text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2">
                 🎯 Visi Ambalan
              </label>
              <div className="relative">
                <textarea 
                    value={visi}
                    onChange={(e) => setVisi(e.target.value)}
                    rows="3"
                    className="w-full p-6 text-xl md:text-2xl font-serif text-center italic text-gray-700 bg-gray-50 rounded-3xl border-2 border-transparent focus:border-red-200 focus:bg-white focus:ring-4 focus:ring-red-50 outline-none transition shadow-inner"
                    placeholder="Contoh: Terwujudnya Pramuka yang berkarakter..."
                ></textarea>
                <div className="text-center mt-2 text-xs text-gray-400 font-medium">Tulis visi secara singkat, padat, dan jelas.</div>
              </div>
           </div>

           <hr className="border-gray-100" />

           {/* SECTION MISI */}
           <div className="relative">
              <div className="absolute -left-12 top-0 text-gray-50 text-9xl font-black pointer-events-none select-none opacity-50">02</div>
              <label className="block text-lg font-black text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-2">
                 🚀 Misi Ambalan
              </label>
              <div className="bg-yellow-50/50 p-6 rounded-3xl border border-yellow-100">
                 <p className="text-sm text-yellow-800 mb-3 font-medium flex items-center gap-2">
                    💡 <b>Tips:</b> Tekan <u>Enter</u> untuk memisahkan setiap poin misi.
                 </p>
                 <textarea 
                    value={misiText}
                    onChange={(e) => setMisiText(e.target.value)}
                    rows="8"
                    className="w-full p-5 bg-white rounded-2xl border border-gray-200 focus:border-orange-300 focus:ring-4 focus:ring-orange-50 outline-none transition font-medium text-gray-700 leading-loose"
                    placeholder="1. Meningkatkan iman dan taqwa&#10;2. Mengembangkan bakat anggota..."
                 ></textarea>
              </div>
           </div>

           {/* ACTION BUTTON */}
           <div className="pt-4">
              <button type="submit" className="w-full bg-gray-900 text-white font-black text-lg py-5 rounded-2xl shadow-2xl hover:bg-red-600 hover:shadow-red-200 hover:-translate-y-1 transition duration-300 flex items-center justify-center gap-3">
                 <span>💾</span> SIMPAN PERUBAHAN
              </button>
           </div>

        </form>
      </div>
    </div>
  );
}