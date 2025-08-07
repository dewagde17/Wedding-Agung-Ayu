'use client';

import Link from 'next/link';
import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const hideNavbar = pathname === '/admin/login';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTime');
    router.replace('/admin/login');
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginTime = localStorage.getItem('loginTime');

    if (isLoggedIn !== 'true' || !loginTime) {
      router.replace('/admin/login');
      return;
    }

    const loginTimestamp = parseInt(loginTime, 10);
    const oneHour = 60 * 60 * 1000;
    const now = Date.now();

    if (now - loginTimestamp > oneHour) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('loginTime');
      router.replace('/admin/login');
    }
  }, [router]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('loginTime');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

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
