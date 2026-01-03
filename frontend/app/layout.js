// frontend/app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; // <--- Import Navbar kita tadi

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pramuka Organization",
  description: "Website resmi informasi kegiatan Pramuka",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* Pasang Navbar di paling atas */}
        <Navbar />
        
        {/* Halaman konten akan muncul di sini */}
        {children}
        
        {/* Footer Sederhana */}
        <footer className="bg-gray-800 text-white text-center p-4 mt-10">
          <p>&copy; 2024 Pramuka Indonesia. Salam Pramuka!</p>
        </footer>
      </body>
    </html>
  );
}