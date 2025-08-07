'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from "./lib/firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';
import Judul from "./main/judul";
import 'animate.css';


export default function Home() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [person, setPerson] = useState<{ id: string, nama: string } | null>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchTamu = async () => {
      if (!id) return;

      const q = query(collection(db, 'tamu'), where('id', '==', id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setPerson(doc.data() as { id: string; nama: string });
      } else {
        setPerson(null);
      }
    };

    fetchTamu();
  }, [id]);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  return (
    <div className="relative w-screen h-screen overflow-x-hidden">
  {/* Splash Section - Fullscreen without card */}
  <div
    className={`absolute inset-0 z-50 bg-cover bg-center transition-all duration-1000 ${
      isButtonClicked ? 'animate__animated animate__slideOutUp' : 'animate__animated animate__fadeIn'
    }`}
    style={{ backgroundImage: "url('/img/hd4.jpg')" }}
  >
    <div className="absolute inset-0 bg-black/60"></div>

    <div className="flex flex-col justify-center h-full text-center text-white px-6">
  <div className="flex flex-col animate__animated animate__fadeInDown animate__slower space-y-2 items-center">
    <p className="text-xs sm:text-sm lg:text-base font-lora tracking-widest" style={{ wordSpacing: "0.2rem" }}>
      THE WEDDING OF
    </p>
    <img src="/img/logo-wed.png" alt="Logo" className="w-16 sm:w-20 lg:w-24" />
    <h1 className="text-4xl sm:text-5xl lg:text-6xl allura-regular">
      Agung <span className="text-4xl allura-regular">&amp;</span> Ayu
    </h1>
    <p className="text-xs sm:text-sm lg:text-base font-lora">Minggu, 31 Agustus 2025</p>
  </div>

  {/* Bagian Yth, dengan animasi berbeda */}
  <div className="mt-10 animate__animated animate__fadeInUp animate__slower text-xs sm:text-sm lg:text-base font-lora">
    <p>
      Yth, <br />
      <span className="font-bold">{person ? person.nama : 'Bapak/Ibu/Saudara/i'}</span>
    </p>

    <button
      onClick={handleButtonClick}
      className="mt-4 px-6 py-2 rounded-xl bg-[#704D34] hover:bg-[#9a7552] transition text-white text-[10px] sm:text-xs lg:text-sm shadow-md cursor-pointer"
    >
      Buka Undangan
    </button>
  </div>
</div>

  </div>

  {/* Main Content */}
  <div className={`${isButtonClicked ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-1000`}>
    {isButtonClicked && <Judul triggerPlay={isButtonClicked} />}
  </div>
</div>

  );
}
