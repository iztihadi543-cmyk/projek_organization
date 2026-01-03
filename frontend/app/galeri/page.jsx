'use client';

import { useState, useEffect } from 'react';

export default function Galeri() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/galeri?limit=50`;
        if (filter === 'photo') {
          url = `${process.env.NEXT_PUBLIC_API_URL}/api/galeri/photos?limit=50`;
        } else if (filter === 'video') {
          url = `${process.env.NEXT_PUBLIC_API_URL}/api/galeri/videos?limit=50`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
          setItems(data.data);
        }
      } catch (error) {
        console.error('Error fetching galeri:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGaleri();
  }, [filter]);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title inline-block">Galeri Foto & Video</h1>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Kumpulan dokumentasi kegiatan dan acara organisasi dalam bentuk foto dan video
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-4 mb-8">
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
          <button
            onClick={() => setFilter('photo')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'photo'
                ? 'bg-pramuka-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Foto
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              filter === 'video'
                ? 'bg-pramuka-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Video
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pramuka-primary border-t-transparent"></div>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Belum ada item galeri</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item._id} className="card overflow-hidden group cursor-pointer">
                  <div className="aspect-square relative">
                    {item.type === 'video' ? (
                      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-xs">Video</span>
                        </div>
                      </div>
                    ) : (
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-semibold">{item.title}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                    <p className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

