'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from "./lib/firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';
import Judul from "../app/main/judul";
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
    style={{ backgroundImage: "url('/img/landscape1.JPG')" }}
  >
    <div className="absolute inset-0 bg-black/50"></div>

    {/* Desktop Layout */}
    <div className="hidden md:flex flex-col justify-between h-full text-white px-6 py-12">
      {/* Bagian Atas */}
      <div className="flex flex-col items-center text-center mt-8 space-y-2">
        <p className="text-4xl font-lora animate__animated animate__fadeInDown animate__slow">THE WEDDING OF</p>
        <img src="/img/logo-wed.png" alt="Logo" className="w-20 z-5" />
        <h1 className="text-4xl md:text-5xl allura-regular text-white animate__animated animate__fadeInDown animate__slower">
          AGUNG <span className="text-4xl md:text-5xl font-light">&amp;</span> AYU
        </h1>
        <p className="text-lg md:text-xl font-lora animate__animated animate__fadeInDown animate__slow">Minggu, 31 Agustus 2025</p>
      </div>
      
      {/* Bagian Bawah */}
      <div className="flex flex-col items-center text-center mb-12">
        <p className="text-sm md:text-base animate__animated animate__fadeInDown animate__slower font-lora">
        Kepada  Yth, <br /><span className="font-semibold">{person ? person.nama : 'Bapak/Ibu/Saudara/i'}</span>
        </p>
        
        <button
          onClick={handleButtonClick}
          className="mt-4 px-6 py-2 rounded-xl bg-[#b58b64] hover:bg-[#9a7552] transition text-white text-sm shadow-md cursor-pointer z-5"
        >
          Buka Undangan
        </button>
      </div>
    </div>

    {/* Mobile Layout */}
    <div className="flex md:hidden flex-col justify-center h-full text-center text-white px-6 pb-10">
      <div className="flex flex-col animate__animated animate__fadeInUp animate__slower space-y-2 items-center text-center">
        <p className="text-6xl tangerine-bold">The Wedding Of</p>
         <img src="/img/logo-wed.png" alt="Logo" className="w-20 z-5" />
        <h1 className="text-4xl font-serif">
          Agung <span className="text-4xl">&amp;</span> Ayu
        </h1>
        <p className="text-sm font-serif">Minggu, 31 Agustus 2025</p>
        <p className="text-sm mt-4 font-serif">Yth, <br /> <span className="font-semibold">{person ? person.nama : 'Bapak/Ibu/Saudara/i'}</span></p>
        <button
          onClick={handleButtonClick}
          className="mt-4 px-6 py-2 rounded-xl bg-[#b58b64] hover:bg-[#9a7552] transition text-white text-sm shadow-md cursor-pointer"
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
