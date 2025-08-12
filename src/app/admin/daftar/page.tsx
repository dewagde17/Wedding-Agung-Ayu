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
  orderBy,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type Tamu = {
  id: string;
  nama: string;
  url: string;
  createdAt: Timestamp;
  docId?: string;
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
    const url = `https://wedding-agungayu.com/?id=${idUnik}`;

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

  // Ambil data & urutkan terbaru di atas
  useEffect(() => {
    const q = query(tamuCollection, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const hasil: Tamu[] = snapshot.docs.map((doc) => ({
        ...(doc.data() as Tamu),
        docId: doc.id,
      }));
      setDataTamu(hasil);
    });
    return () => unsub();
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const totalPages = Math.ceil(dataTamu.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTamu = dataTamu.slice(startIndex, startIndex + itemsPerPage);

  // Export Excel
  const exportToExcel = () => {
    const exportData = dataTamu.map((t, index) => ({
      No: index + 1,
      Nama: t.nama,
      ID: t.id,
      URL: t.url,
      CreatedAt: t.createdAt.toDate().toLocaleString()
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Daftar Tamu");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `daftar_tamu_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

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

      {/* Tombol Export */}
      <div className="flex">
        <button
          onClick={exportToExcel}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Export ke Excel
        </button>
      </div>

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
            {currentTamu.map((tamu, index) => (
              <tr key={tamu.id}>
                <td className="border px-4 py-2 text-center">{startIndex + index + 1}</td>
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

      {/* Navigasi Halaman */}
      <div className="flex justify-center items-center mt-4 gap-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-2 py-1 bg-gray-300 rounded disabled:opacity-0"
        >
          &larr; Prev
        </button>
        <span>
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-2 py-1 bg-gray-300 rounded disabled:opacity-0"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
