// FILE: frontend/app/berita/page.jsx
// INI ADALAH HALAMAN PUBLIK (UNTUK PENGUNJUNG)

async function getBerita() {
  const res = await fetch('http://localhost:5000/api/berita', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export const metadata = { title: "Berita & Artikel - Pramuka" };

export default async function BeritaPage() {
  const dataBerita = await getBerita();

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-red-700 mb-10">Kabar Pramuka 📰</h1>
        
        {/* GRID BERITA */}
        <div className="grid md:grid-cols-3 gap-8">
          {dataBerita.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition">
              <div className="h-48 bg-gray-200">
                <img 
                  src={item.gambar && item.gambar.startsWith('http') ? item.gambar : "https://placehold.co/600x400?text=No+Image"} 
                  alt={item.judul} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{item.judul}</h2>
                <div className="text-sm text-gray-500 mb-4 flex justify-between">
                   <span>👤 {item.penulis}</span>
                   <span>📅 {new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
                <p className="text-gray-600 line-clamp-3 mb-4 text-sm">{item.konten}</p>
                <button className="mt-auto text-red-600 font-bold text-sm hover:underline text-left">BACA SELENGKAPNYA &rarr;</button>
              </div>
            </div>
          ))}
          
          {dataBerita.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">Belum ada berita.</div>
          )}
        </div>
      </div>
    </main>
  );
}