'use client';

import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';

type Tamu = {
  id: string;
  nama: string;
  url: string;
  createdAt: Timestamp;
  docId?: string; // untuk menyimpan ID dokumen dari Firestore
};

export default function DaftarTamuPage() {
    const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.replace('/admin/login');
    }
  }, [router]);
  const [nama, setNama] = useState('');
  const [dataTamu, setDataTamu] = useState<Tamu[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editNama, setEditNama] = useState('');

  const tamuCollection = collection(db, 'tamu');

  const generateId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const tambahTamu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) return;

    const idUnik = generateId();
    const url = `https://yourdomain.com/undangan/${idUnik}`;

    await addDoc(tamuCollection, {
      nama,
      id: idUnik,
      url,
      createdAt: Timestamp.now(),
    });

    setNama('');
  };

  const hapusTamu = async (docId: string) => {
    await deleteDoc(doc(db, 'tamu', docId));
  };

  const simpanEdit = async (docId: string) => {
    await updateDoc(doc(db, 'tamu', docId), {
      nama: editNama,
    });
    setEditId(null);
    setEditNama('');
  };

  useEffect(() => {
    const q = query(tamuCollection);
    const unsub = onSnapshot(q, (snapshot) => {
      const hasil: Tamu[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as Tamu),
        docId: doc.id,
      }));
      setDataTamu(hasil);
    });
    return () => unsub();
  }, []);

  return (
  <div className="max-w-screen-2xl mx-auto px-4 py-8 space-y-6">
    <h2 className="text-2xl font-bold">Daftar Tamu</h2>

    <form onSubmit={tambahTamu} className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        placeholder="Nama Tamu"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Tambah
      </button>
    </form>

    <div className="overflow-x-auto">
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Nama</th>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">URL</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataTamu.map((tamu, index) => (
            <tr key={tamu.id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">
                {editId === tamu.docId ? (
                  <input
                    type="text"
                    value={editNama}
                    onChange={(e) => setEditNama(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  tamu.nama
                )}
              </td>
              <td className="border px-4 py-2">{tamu.id}</td>
              <td className="border px-4 py-2 break-words">
                <a
                  href={tamu.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {tamu.url}
                </a>
              </td>
              <td className="border px-4 py-2 space-x-2">
                {editId === tamu.docId ? (
                  <button
                    onClick={() => simpanEdit(tamu.docId!)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Simpan
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditId(tamu.docId!);
                      setEditNama(tamu.nama);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => hapusTamu(tamu.docId!)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}
