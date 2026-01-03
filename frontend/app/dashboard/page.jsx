'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    berita: 0,
    agenda: 0,
    galeri: 0,
    anggota: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const currentUser = authService.getUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }

    setUser(currentUser);
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      // Fetch stats dari API
      const [beritaRes, agendaRes, galeriRes, anggotaRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/berita`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agenda`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/galeri`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/anggota`),
      ]);

      const [beritaData, agendaData, galeriData, anggotaData] = await Promise.all([
        beritaRes.json(),
        agendaRes.json(),
        galeriRes.json(),
        anggotaRes.json(),
      ]);

      setStats({
        berita: beritaData.pagination?.total || 0,
        agenda: agendaData.pagination?.total || 0,
        galeri: galeriData.pagination?.total || 0,
        anggota: anggotaData.pagination?.total || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-pramuka-primary border-t-transparent"></div>
      </div>
    );
  }

  const menuItems = [
    {
      title: 'Berita',
      href: '/dashboard/berita',
      icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
      color: 'bg-blue-500',
      count: stats.berita,
    },
    {
      title: 'Agenda',
      href: '/dashboard/agenda',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: 'bg-green-500',
      count: stats.agenda,
    },
    {
      title: 'Galeri',
      href: '/dashboard/galeri',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: 'bg-purple-500',
      count: stats.galeri,
    },
    {
      title: 'Anggota',
      href: '/dashboard/anggota',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      color: 'bg-yellow-500',
      count: stats.anggota,
    },
  ];

  if (user.role === 'admin') {
    menuItems.push({
      title: 'Manajemen User',
      href: '/dashboard/users',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      color: 'bg-red-500',
      count: 0,
    });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Dashboard Header */}
      <header className="bg-pramuka-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-gray-300 text-sm">Selamat datang, {user.username}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.title} className="card p-6 hover:shadow-xl transition-shadow">
              <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mb-4`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-3xl font-bold text-pramuka-primary">{loading ? '-' : item.count}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-pramuka-primary mb-6">Aksi Cepat</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/dashboard/berita" className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="font-medium">Tambah Berita Baru</span>
            </Link>
            <Link href="/dashboard/agenda" className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="font-medium">Tambah Agenda</span>
            </Link>
            <Link href="/dashboard/galeri" className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="font-medium">Upload Foto/Video</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-pramuka-primary mb-6">Menu Navigasi</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <Link
                href={item.href}
                key={item.title}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-pramuka-primary hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <span className="font-medium">{item.title}</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

