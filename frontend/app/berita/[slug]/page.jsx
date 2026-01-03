'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BeritaDetail({ params }) {
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/berita/${params.slug}`
        );
        const data = await response.json();
        
        if (data.success) {
          setBerita(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error('Error fetching berita:', error);
        setError('Gagal memuat berita');
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pramuka-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error || !berita) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Berita Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8">{error || 'Berita yang Anda cari tidak tersedia'}</p>
        <Link href="/berita" className="btn-primary">
          Kembali ke Berita
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-pramuka-primary">Beranda</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/berita" className="text-gray-500 hover:text-pramuka-primary">Berita</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-pramuka-primary">{berita.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-pramuka-secondary text-pramuka-dark px-3 py-1 rounded-full text-sm font-semibold uppercase">
              {berita.category}
            </span>
            {berita.tags && berita.tags.length > 0 && (
              <div className="flex gap-2">
                {berita.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {berita.title}
          </h1>

          <div className="flex items-center text-gray-500 text-sm">
            <div className="flex items-center mr-6">
              <div className="w-8 h-8 bg-pramuka-primary rounded-full flex items-center justify-center text-white mr-2">
                {berita.author?.username?.charAt(0) || 'A'}
              </div>
              <span>{berita.author?.username || 'Admin'}</span>
            </div>
            <span className="mr-6">
              {berita.publishedAt 
                ? new Date(berita.publishedAt).toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })
                : new Date(berita.createdAt).toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })
              }
            </span>
            <span>{berita.views || 0} views</span>
          </div>
        </header>

        {/* Featured Image */}
        {berita.image && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img 
              src={berita.image} 
              alt={berita.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: berita.content }} />
        </article>

        {/* Share & Back */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/berita" className="text-pramuka-primary hover:underline">
              ← Kembali ke Berita
            </Link>
            <div className="flex gap-2">
              <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

