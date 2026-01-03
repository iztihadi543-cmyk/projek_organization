// FILE: frontend/app/galeri/page.jsx

async function getGaleri() {
  // Ambil data foto dari backend
  const res = await fetch('http://localhost:5000/api/galeri', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export const metadata = { title: "Galeri Dokumentasi - Pramuka" };

export default async function GaleriPage() {
  const dataGaleri = await getGaleri();

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        <h1 className="text-4xl font-bold text-center text-red-700 mb-2">Galeri Kegiatan 📸</h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Momen-momen seru dan kenangan berharga dari setiap kegiatan ambalan kami.
        </p>

        {/* GRID FOTO MASONRY STYLE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dataGaleri.map((item) => (
            <div key={item._id} className="relative group rounded-xl overflow-hidden shadow-lg bg-gray-200 aspect-square">
              
              {/* Gambar */}
              <img 
                src={item.imageUrl} 
                alt={item.judul}
                className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
              />
              
              {/* Overlay Text (Muncul saat di-hover) */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition duration-300 flex flex-col justify-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="text-white font-bold text-lg">{item.judul}</h3>
                  {item.deskripsi && (
                    <p className="text-gray-200 text-sm mt-1 line-clamp-2">{item.deskripsi}</p>
                  )}
                </div>
              </div>

            </div>
          ))}

          {/* Pesan jika kosong */}
          {dataGaleri.length === 0 && (
             <div className="col-span-full text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
               <div className="text-4xl mb-2">📷</div>
               <p className="text-gray-500">Belum ada foto yang diunggah.</p>
             </div>
          )}
        </div>

      </div>
    </main>
  );
}