'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth';

export default function DashboardUsers() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'editor',
  });

  useEffect(() => {
    const currentUser = authService.getUser();
    if (!currentUser) { router.push('/login'); return; }
    if (currentUser.role !== 'admin') { router.push('/dashboard'); return; }
    setUser(currentUser);
    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${authService.getToken()}` },
      });
      const data = await response.json();
      if (data.success) setUsers(data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${authService.getToken()}` },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) { setShowForm(false); setFormData({ username: '', email: '', password: '', role: 'editor' }); fetchUsers(); }
      else alert(data.message || 'Gagal membuat user');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus user ini?')) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authService.getToken()}` },
      });
      const data = await response.json();
      if (data.success) fetchUsers();
      else alert(data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-pramuka-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Manajemen User</h1>
            <Link href="/dashboard" className="text-gray-300 hover:text-white">← Kembali</Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={() => setShowForm(!showForm)} className="btn-primary mb-6">{showForm ? 'Batal' : '+ Tambah User'}</button>
        {showForm && (
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Tambah User Baru</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
              <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required minLength={6} />
              <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
              <button type="submit" className="btn-primary">Simpan</button>
            </form>
          </div>
        )}
        {loading ? (
          <div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-4 border-pramuka-primary border-t-transparent mx-auto"></div></div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{u.username}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded-full ${u.role === 'admin' ? 'bg-red-100 text-red-800' : u.role === 'editor' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}>{u.role}</span></td>
                    <td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded-full ${u.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>{u.isActive ? 'Aktif' : 'Nonaktif'}</span></td>
                    <td className="px-6 py-4">
                      {u._id !== user._id && (
                        <button onClick={() => handleDelete(u._id)} className="text-red-600 hover:text-red-800 text-sm">Hapus</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

