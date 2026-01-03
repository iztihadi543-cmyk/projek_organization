'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Berita() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/berita?page=${page}&limit=6`
        );
        const data = await response.json();
        
        if (data.success) {
          setBerita(data.data);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error('Error fetching berita:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [page]);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title inline-block">Berita & Artikel</h1>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Informasi terkini tentang kegiatan dan perkembangan organisasi
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pramuka-primary border-t-transparent"></div>
          </div>
        )}

        {/* Berita Grid */}
        {!loading && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {berita.map((item) => (
                <Link href={`/berita/${item.slug}`} key={item._id} className="card group">
                  <div className="h-48 overflow-hidden relative">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pramuka-primary to-pramuka-dark flex items-center justify-center">
                        <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-pramuka-secondary text-pramuka-dark px-3 py-1 rounded-full text-xs font-semibold uppercase">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-pramuka-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    
                    {item.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                        <span>{item.author?.username || 'Admin'}</span>
                      </div>
                      <span>
                        {item.publishedAt 
                          ? new Date(item.publishedAt).toLocaleDateString('id-ID')
                          : new Date(item.createdAt).toLocaleDateString('id-ID')
                        }
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty state */}
            {berita.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <p>Belum ada berita</p>
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Halaman {page} dari {pagination.pages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === pagination.pages}
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

