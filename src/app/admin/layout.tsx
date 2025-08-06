'use client';

import Link from 'next/link';
import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // Sembunyikan navbar saat berada di /admin/login
  const hideNavbar = pathname === '/admin/login';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.replace('/admin/login');
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.replace('/admin/login');
    }
    
  }, [router]);

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
