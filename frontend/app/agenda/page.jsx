'use client';

import { useState, useEffect } from 'react';

export default function Agenda() {
  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const url = filter === 'upcoming' 
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/agenda/upcoming?limit=20`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/agenda?limit=20`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
          setAgenda(data.data);
        }
      } catch (error) {
        console.error('Error fetching agenda:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgenda();
  }, [filter]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('id-ID', { month: 'short' }),
      full: date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time: date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title inline-block">Agenda & Kegiatan</h1>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Jadwal kegiatan dan acara yang akan datang dari organisasi Pramuka
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'upcoming'
                ? 'bg-pramuka-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Akan Datang
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-pramuka-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Semua
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pramuka-primary border-t-transparent"></div>
            <p className="mt-4 text-gray-500">Memuat agenda...</p>
          </div>
        )}

        {/* Agenda Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agenda.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Belum ada agenda kegiatan</p>
              </div>
            ) : (
              agenda.map((item) => {
                const date = formatDate(item.date);
                return (
                  <div key={item._id} className="card overflow-hidden group">
                    {/* Image or placeholder */}
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-pramuka-primary to-pramuka-dark flex items-center justify-center">
                          <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-pramuka-secondary text-pramuka-dark px-3 py-1 rounded-full text-sm font-semibold">
                        {item.category}
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Date */}
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {date.full}
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-xl mb-2 group-hover:text-pramuka-primary transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Location & Time */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {item.location}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {date.time}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

