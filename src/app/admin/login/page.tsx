'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import bcrypt from 'bcryptjs';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Cari user berdasarkan username
      const q = query(collection(db, 'users'), where('username', '==', username));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError('Username tidak ditemukan');
        return;
      }

      const userData = snapshot.docs[0].data();
      const isPasswordValid = await bcrypt.compare(password, userData.password);

      if (!isPasswordValid) {
        setError('Password salah');
        return;
      }

      // ✅ Simpan login session
      const loginTime = Date.now();
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('admin_login', JSON.stringify({ time: loginTime }));

      router.push('/admin');

    } catch (err) {
      console.error('Login error:', err);
      setError('Terjadi kesalahan saat login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl mb-4 font-bold">Login Admin</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
