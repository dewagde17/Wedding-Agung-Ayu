'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useRouter } from 'next/navigation';

// Tipe data tamu
type Tamu = {
  id: string;
  nama: string;
  jumlah: string;
  kehadiran: 'belum' | 'hadir' | 'tidak';
};

export default function DaftarTamu() {
    const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.replace('/admin/login');
    }
  }, [router]);
  const [data, setData] = useState<Tamu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ambilData();
  }, []);

  const ambilData = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'reservasi'));
      const tamuData: Tamu[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Tamu[];

      setData(tamuData);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    } finally {
      setLoading(false);
    }
  };

  const hapusTamu = async (id: string) => {
    const konfirmasi = confirm('Yakin ingin menghapus tamu ini?');
    if (!konfirmasi) return;

    try {
      await deleteDoc(doc(db, 'reservasi', id));
      setData((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Gagal menghapus tamu:', error);
    }
  };

  return (
    <div className="p-4 md:p-6 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Daftar Tamu</h1>
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Jumlah</th>
              <th className="border px-4 py-2">Kehadiran</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tamu) => (
              <tr key={tamu.id}>
                <td className="border px-4 py-2">{tamu.nama}</td>
                <td className="border px-4 py-2">{tamu.jumlah}</td>
                <td className="border px-4 py-2 capitalize">{tamu.kehadiran}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => hapusTamu(tamu.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
