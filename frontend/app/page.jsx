'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [upcomingAgenda, setUpcomingAgenda] = useState([]);

  useEffect(() => {
    // Fetch data dari API
    const fetchData = async () => {
      try {
        // Featured news
        const newsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/berita/featured?limit=3`);
        const newsData = await newsResponse.json();
        if (newsData.success) {
          setFeaturedNews(newsData.data);
        }

        // Upcoming agenda
        const agendaResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agenda/upcoming?limit=3`);
        const agendaData = await agendaResponse.json();
        if (agendaData.success) {
          setUpcomingAgenda(agendaData.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-pramuka-dark text-white py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pramuka-dark/90 to-pramuka-dark/70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Pramuka Organization
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Membentuk generasi muda yang beriman, berakhlak mulia, berwatak, 
              dan berkebaksanaan untuk membangun bangsa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/profil" className="btn-primary">
                Pelajari Lebih Lanjut
              </Link>
              <Link href="/agenda" className="btn-secondary">
                Lihat Kegiatan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-pramuka-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-pramuka-secondary mb-2">1960</div>
              <div className="text-sm text-gray-300">Tahun Berdiri</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pramuka-secondary mb-2">500+</div>
              <div className="text-sm text-gray-300">Anggota Aktif</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pramuka-secondary mb-2">50+</div>
              <div className="text-sm text-gray-300">Pengurus</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pramuka-secondary mb-2">100+</div>
              <div className="text-sm text-gray-300">Kegiatan</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Tentang Pramuka</h2>
              <p className="text-gray-600 mb-6">
                Gerakan Pramuka adalah organisasi pendidikan luar sekolah yang 
                memberikan bekal keterampilan dan nilai-nilai kehidupan kepada 
                молодежь untuk menjadi warga negara yang baik dan bertanggung jawab.
              </p>
              <p className="text-gray-600 mb-6">
                Dengan moto "Siap Sedia Memenuhi Panggilan Kewajiban", kami 
                berkomitmen untuk terus berkontribusi dalam pembangunan bangsa 
                melalui pendidikan karakter dan kepemimpinan.
              </p>
              <Link href="/profil" className="btn-primary inline-block">
                Baca Selengkapnya
              </Link>
            </div>
            <div className="relative h-80 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-pramuka-primary text-white">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-pramuka-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-pramuka-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <p className="font-bold text-xl">1960</p>
                  <p className="text-sm">Tahun Berdirinya</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="section-title mb-0">Berita Terkini</h2>
              <Link href="/berita" className="text-pramuka-primary hover:underline">
                Lihat Semua →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredNews.map((news) => (
                <Link href={`/berita/${news.slug}`} key={news._id} className="card group">
                  {news.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="text-xs font-semibold text-pramuka-accent uppercase">
                      {news.category}
                    </span>
                    <h3 className="font-bold text-lg mt-2 group-hover:text-pramuka-primary transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {news.formattedDate || new Date(news.createdAt).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Agenda */}
      {upcomingAgenda.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="section-title mb-0">Agenda Mendatang</h2>
              <Link href="/agenda" className="text-pramuka-primary hover:underline">
                Lihat Semua →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingAgenda.map((agenda) => (
                <div key={agenda._id} className="card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-pramuka-secondary text-pramuka-dark rounded-lg p-3 text-center min-w-[70px]">
                      <div className="text-2xl font-bold">
                        {new Date(agenda.date).getDate()}
                      </div>
                      <div className="text-xs uppercase">
                        {new Date(agenda.date).toLocaleDateString('id-ID', { month: 'short' })}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <span className="text-xs font-semibold text-pramuka-accent uppercase">
                        {agenda.category}
                      </span>
                      <h3 className="font-bold mt-1">{agenda.title}</h3>
                      <p className="text-sm text-gray-500 mt-2">
                        📍 {agenda.location}
                      </p>
                      <p className="text-sm text-gray-500">
                        🕐 {new Date(agenda.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-pramuka-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Bergabung dengan Kami</h2>
          <p className="text-gray-300 mb-8">
            Mari bersama-sama membangun generasi muda yang berkarakter, 
            bermoral, dan berjiwa pelayanan.
          </p>
          <Link href="/kontak" className="btn-secondary">
            Hubungi Kami
          </Link>
        </div>
      </section>
    </div>
  );
}

