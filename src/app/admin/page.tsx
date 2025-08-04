'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn !== 'true') {
      router.replace('/admin'); // Redirect ke login kalau belum login
    } else {
      router.replace('/admin/reservasi'); // Kalau sudah login, lanjut ke dashboard
    }
  }, [router]);

  return null;
}
