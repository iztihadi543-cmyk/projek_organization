// frontend/app/agenda/page.jsx

async function getAgenda() {
  const res = await fetch('http://localhost:5000/api/agenda', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export const metadata = {
  title: "Agenda Kegiatan - Ambalan Gajah Mada",
};

export default async function AgendaPage() {
  const agenda = await getAgenda();

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        <h1 className="text-4xl font-bold text-center text-green-800 mb-2">Agenda Kegiatan 📅</h1>
        <p className="text-center text-gray-600 mb-10">
          Jadwal latihan rutin dan acara besar Ambalan Gajah Mada.
        </p>

        <div className="space-y-4">
          {agenda.length > 0 ? (
            agenda.map((item) => (
              <div key={item._id} className="bg-white p-6 rounded-lg shadow-md border-l-8 border-green-600 flex flex-col md:flex-row justify-between items-center hover:shadow-lg transition">
                
                {/* Tanggal */}
                <div className="text-center md:text-left mb-4 md:mb-0 md:w-1/4">
                  <div className="text-3xl font-bold text-gray-800">
                    {new Date(item.tanggalMulai).getDate()}
                  </div>
                  <div className="text-sm font-bold text-red-600 uppercase">
                    {new Date(item.tanggalMulai).toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(item.tanggalMulai).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                  </div>
                </div>

                {/* Info Kegiatan */}
                <div className="md:w-3/4 md:pl-6 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0">
                  <h2 className="text-xl font-bold text-gray-800">{item.namaKegiatan}</h2>
                  <p className="text-gray-600 text-sm mt-1 mb-2">📍 {item.lokasi}</p>
                  <p className="text-gray-500 text-sm italic">"{item.deskripsi}"</p>
                  
                  {/* Status Badge */}
                  <div className="mt-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                      item.status === 'selesai' ? 'bg-gray-200 text-gray-500' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

              </div>
            ))
          ) : (
             <div className="text-center py-12 bg-white rounded shadow">
               <p className="text-gray-500">Belum ada agenda kegiatan.</p>
             </div>
          )}
        </div>

      </div>
    </main>
  );
}