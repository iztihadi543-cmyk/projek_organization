export default function Profil() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-title inline-block">Profil Organisasi</h1>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Mengenal lebih dekat tentang gerakan Pramuka dan organisasi kami
          </p>
        </div>

        {/* Sejarah */}
        <section id="sejarah" className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-pramuka-primary mb-4">Sejarah Singkat</h2>
              <div className="prose text-gray-600">
                <p className="mb-4">
                  Gerakan Pramuka Indonesia atau yang lebih dikenal dengan sebutan Pramuka 
                  adalah organisasi pendidikan luar sekolah yang didirikan pada tanggal 
                  14 Agustus 1960.
                </p>
                <p className="mb-4">
                  Pramuka didirikan dengan tujuan memberikan bekal keterampilan dan 
                  nilai-nilai kehidupan kepada молодежь Indonesia agar menjadi warga 
                  negara yang baik dan bertanggung jawab.
                </p>
                <p>
                  Dengan moto "Siap Sedia Memenuhi Panggilan Kewajiban", Pramuka 
                  terus berkomitmen untuk berkontribusi dalam pembangunan bangsa 
                  melalui pendidikan karakter dan kepemimpinan.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p>Foto Sejarah</p>
              </div>
            </div>
          </div>
        </section>

        {/* Visi Misi */}
        <section id="visi-misi" className="mb-16 bg-gray-100 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-pramuka-primary mb-6 flex items-center">
                <span className="w-10 h-10 bg-pramuka-secondary rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-pramuka-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
                Visi
              </h2>
              <p className="text-gray-700 text-lg">
                "Terbentuknya karakter, akhlak mulia, dan berkepribadian Indonesia yang 
                cinta tanah air dan bertanggung jawab secara spiritual dan material 
                bagi kepentingan bangsa dan negara."
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-pramuka-primary mb-6 flex items-center">
                <span className="w-10 h-10 bg-pramuka-secondary rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-pramuka-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </span>
                Misi
              </h2>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="text-pramuka-secondary mr-2">✓</span>
                  Menanamkan dan menumbuhkan semangat kebangsaan, cinta tanah air, dan sikap mengutamakan kepentingan umum
                </li>
                <li className="flex items-start">
                  <span className="text-pramuka-secondary mr-2">✓</span>
                  Mengembangkan keterampilan dan keahlian untuk meningkatkan ketangguhan dan kemandirian
                </li>
                <li className="flex items-start">
                  <span className="text-pramuka-secondary mr-2">✓</span>
                  Membina dan meningkatkan kualitas lingkungan hidup serta mengantisipasi bencana
                </li>
                <li className="flex items-start">
                  <span className="text-pramuka-secondary mr-2">✓</span>
                  Membina generasi muda yang bermoral, berakhlak, dan berwatak
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Nilai-Nilai */}
        <section>
          <h2 className="text-2xl font-bold text-pramuka-primary mb-8 text-center">Nilai-Nilai Pramuka</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Dharma Prasetya', desc: 'Budi Pekerti yang luhur dan Mulia' },
              { title: 'Dharma Satya', desc: 'Selalu menepati janji dan setia pada tugas' },
              { title: 'Dharma Sewa', desc: 'Memberikan pelayanan dengan penuh keikhlasan' },
            ].map((nilai, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="w-16 h-16 bg-pramuka-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">{index + 1}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{nilai.title}</h3>
                <p className="text-gray-600">{nilai.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

