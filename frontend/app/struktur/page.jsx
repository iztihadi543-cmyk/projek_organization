export default function Struktur() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-title inline-block">Struktur Organisasi</h1>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Susunan pengurus organisasi Pramuka dalam menjalankan roda organisasi
          </p>
        </div>

        {/* Organisasi Chart - Simple Tree */}
        <div className="flex flex-col items-center">
          {/* Ketua Umum */}
          <div className="bg-pramuka-primary text-white rounded-lg p-6 text-center w-64 mb-8 shadow-lg">
            <div className="w-20 h-20 bg-pramuka-secondary rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-pramuka-dark text-2xl font-bold">K</span>
            </div>
            <h3 className="font-bold text-lg">Nama Ketua Umum</h3>
            <p className="text-sm text-gray-300">Ketua Umum</p>
          </div>

          {/* Connector */}
          <div className="w-0.5 h-8 bg-gray-300"></div>

          {/* Wakil & Sekjen */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-white border-2 border-pramuka-primary rounded-lg p-4 text-center w-56 shadow-md">
              <h3 className="font-bold text-pramuka-primary">Nama Wakil</h3>
              <p className="text-sm text-gray-500">Wakil Ketua</p>
            </div>
            <div className="bg-white border-2 border-pramuka-primary rounded-lg p-4 text-center w-56 shadow-md">
              <h3 className="font-bold text-pramuka-primary">Nama Sekjen</h3>
              <p className="text-sm text-gray-500">Sekretaris Jenderal</p>
            </div>
          </div>

          {/* Connector */}
          <div className="w-0.5 h-8 bg-gray-300"></div>

          {/* Bidang-bidang */}
          <div className="bg-gray-100 rounded-xl p-8 w-full">
            <h3 className="text-xl font-bold text-pramuka-primary text-center mb-8">Bidang-Bidang</h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'Bidang Organisasi & Kelembagaan',
                'Bidang Pendidikan & Pelatihan',
                'Bidang Komunikasi & Informasi',
                'Bidang Kesejahteraan Anggota',
                'Bidang Pengembangan Daerah',
                'Bidang Pengabdian Sosial',
                'Bidang Usaha & Dana',
                'Bidang Hukum & Advokasi',
              ].map((bidang, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-pramuka-secondary rounded-full flex items-center justify-center mb-3">
                    <span className="text-pramuka-dark font-bold">{index + 1}</span>
                  </div>
                  <h4 className="font-semibold text-sm">{bidang}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Link ke Daftar Lengkap */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Lihat struktur lengkap dengan foto dan kontak lengkap pengurus
          </p>
          <a href="/anggota" className="btn-primary inline-block">
            Lihat Daftar Anggota
          </a>
        </div>
      </div>
    </div>
  );
}

