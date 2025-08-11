'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const hideNavbar = pathname === '/admin/login';
  const [authChecked, setAuthChecked] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('lastActivityTime');
    router.replace('/admin/login');
  };

  // Update aktivitas user
  useEffect(() => {
    const updateActivity = () => {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        localStorage.setItem('lastActivityTime', Date.now().toString());
      }
    };

    window.addEventListener('click', updateActivity);
    window.addEventListener('keypress', updateActivity);
    window.addEventListener('mousemove', updateActivity);

    return () => {
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('keypress', updateActivity);
      window.removeEventListener('mousemove', updateActivity);
    };
  }, []);

  // Cek login + waktu aktivitas
  useEffect(() => {
    if (authChecked) return;

    if (hideNavbar) {
      setAuthChecked(true);
      return;
    }

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const lastActivity = localStorage.getItem('lastActivityTime');

    if (isLoggedIn === 'true' && lastActivity) {
      const lastActivityTimestamp = parseInt(lastActivity, 10);
      const thirtyMinutes = 30 * 60 * 1000;
      const now = Date.now();

      // Kalau masih dalam 30 menit sejak aktivitas terakhir → tetap login
      if (now - lastActivityTimestamp <= thirtyMinutes) {
        setAuthChecked(true);
        return;
      }
    }

    // Kalau sudah lewat 30 menit tanpa aktivitas
    handleLogout();
  }, [hideNavbar, authChecked, router]);

  if (!authChecked && !hideNavbar) {
    return <div className="p-6">Memeriksa sesi login...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {!hideNavbar && (
        <nav className="bg-white shadow-md p-4 flex space-x-6">
          <Link href="/admin/reservasi" className="hover:underline">
            Reservasi
          </Link>
          <Link href="/admin/daftar" className="hover:underline">
            Daftar Tamu
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      )}
      <main className="p-6">{children}</main>
    </div>
  );
}
