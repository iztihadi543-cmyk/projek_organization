// frontend/app/dashboard/page.jsx
export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Ringkasan Statistik 📊</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kartu Statistik 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pramuka-red">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Total Berita</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
        </div>

        {/* Kartu Statistik 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pramuka-yellow">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Agenda Aktif</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">3</p>
        </div>

        {/* Kartu Statistik 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Total Anggota</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">45</p>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="font-bold text-blue-800 mb-2">Selamat Datang di Admin Panel!</h3>
        <p className="text-blue-600">
          Gunakan menu di samping kiri (Sidebar) untuk mengelola Berita, Agenda, Galeri, dan Anggota.
        </p>
      </div>
    </div>
  );
}