"use client";
// PENTING: Gunakan ../.. untuk mundur 2 folder dan masuk ke components
import AdminSidebar from "../../components/AdminSidebar"; 

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Panggil Sidebar di sini */}
      <AdminSidebar />

      {/* Area Konten Kanan */}
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}