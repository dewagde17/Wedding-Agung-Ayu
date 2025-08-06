'use client';

import { useState } from 'react';
import { db } from "../lib/firebase"; // pastikan ini path ke file inisialisasi firebase
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function FormReservasi() {
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const nama = formData.get('nama')?.toString() || '';
    const jumlah = formData.get('jumlah')?.toString() || '';
    const kehadiran = formData.get('kehadiran')?.toString() || '';

    try {
      await addDoc(collection(db, 'reservasi'), {
        nama,
        jumlah: String(jumlah),
        kehadiran,
        waktu: Timestamp.now()
      });

      setShowMessage(true);
      form.reset();

      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row w-full mx-auto overflow-hidden">
      <div className="w-full lg:w-1/2">
        <img
          src="/img/galeri4.JPG"
          alt="Pasangan"
          className="w-full min-h-[75vh] object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 p-8 bg-[#704D34] flex flex-col justify-center min-h-[60vh] relative">
      <img
        src="/img/bgres.png"
        alt="Bunga Kiri"
        className="absolute top-0 left-0 w-[60vw] min-w-[150px] max-w-[450px] object-contain pointer-events-none opacity-60"
      />
      <img
        src="/img/bgres-1.png"
        alt="Bunga Kiri"
        className="absolute bottom-0 right-0 w-[30vw] min-w-[150px] max-w-[250px] object-contain pointer-events-none opacity-60"
      />
        <h2 className="text-5xl lg:text-6xl tangerine-bold text-center text-white z-5">
          Reservasi
        </h2>
        <img
    src="/img/line-p.png"
    alt="Ornamen Pembatas"
    className="mx-auto w-48 lg:w-60 -mt-1"
  />

        <div className="w-full px-4 z-5">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto space-y-4 p-4 sm:p-6"
  >
    <div>
      <label className="block text-xs sm:text-sm font-medium text-white viaoda-libre-regular">
        Nama Lengkap
      </label>
      <input
        type="text"
        name="nama"
        required
        placeholder="Masukkan nama"
        className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-white placeholder-white viaoda-libre-regular"
      />
    </div>

    <div>
      <label className="block text-xs sm:text-sm font-medium text-white viaoda-libre-regular">
        Jumlah Tamu
      </label>
      <select
        name="jumlah"
        required
        className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-white viaoda-libre-regular"
      >
        <option className='text-black' value="">Pilih jumlah tamu</option>
        <option className='text-black' value="-">-</option>
        <option className='text-black' value="2">1 Orang</option>
        <option className='text-black' value="3">2 Orang</option>
        
      </select>
    </div>

    <div>
      <label className="block text-xs sm:text-sm font-medium text-white viaoda-libre-regular">
        Konfirmasi Kehadiran
      </label>
      <select
        name="kehadiran"
        required
        className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-white viaoda-libre-regular"
      >
     
        <option className='text-black' value="">Pilih status</option>
        <option className='text-black' value="Hadir">Hadir</option>
        <option className='text-black' value="Tidak Hadir">Tidak Hadir</option>
      
      </select>
    </div>

    <button
      type="submit"
      className="w-full bg-[#3d432b] hover:bg-[#4f5a3a] text-white text-sm py-2 px-4 rounded-lg cursor-pointer viaoda-libre-regular"
    >
      Kirim
    </button>
  </form>
</div>


        {showMessage && (
          <div className="mt-4 text-sm text-green-600 text-center">
            🎉 Terima kasih! Reservasi Anda telah terkirim.
          </div>
        )}
      </div>
    </div>
  );
}
