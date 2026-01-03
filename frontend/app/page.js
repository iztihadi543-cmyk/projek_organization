// frontend/app/page.js

// Fungsi untuk mengambil data dari Backend (API)
async function getBerita() {
  try {
    // 'no-store' agar data tidak disimpan di cache (selalu update)
    const res = await fetch('http://localhost:5000/api/berita', { cache: 'no-store' });
    
    if (!res.ok) {
      throw new Error('Gagal mengambil data');
    }
    
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    return []; // Kembalikan array kosong jika error
  }
}

export default async function Home() {
  // Panggil fungsi di atas
  const berita = await getBerita();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {/* Daftar Berita */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {berita.length > 0 ? (
          berita.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              
              {/* Gambar Berita */}
              <div className="h-48 bg-gray-300 w-full relative">
                <img 
                  src={item.thumbnail} 
                  alt={item.judul}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Konten Berita */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {item.judul}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {item.konten}
                </p>
                <div className="mt-4 text-xs text-gray-400">
                  Diposting pada: {new Date(item.createdAt).toLocaleDateString('id-ID')}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-2">Belum ada berita.</p>
        )}
      </div>
    </main>
  );
}