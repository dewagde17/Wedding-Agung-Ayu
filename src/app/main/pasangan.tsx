'use client';

import { useState, useEffect } from 'react';


const groomImages = ['/img/pria1.jpg', '/img/pria.jpg'];
const brideImages = ['/img/wanita1.jpg', '/img/wanita.jpg'];

export default function Pasangan() {
  const [groomIndex, setGroomIndex] = useState(0);
  const [brideIndex, setBrideIndex] = useState(0);
  const [modal, setModal] = useState<{ type: 'groom' | 'bride'; index: number } | null>(null);

  // Fade effect
  // const [groomFade, setGroomFade] = useState(true);
  // const [brideFade, setBrideFade] = useState(true);

  // useEffect(() => {
  //   const groomTimer = setInterval(() => {
  //     setGroomFade(false);
  //     setTimeout(() => {
  //       setGroomIndex((prev) => (prev + 1) % groomImages.length);
  //       setGroomFade(true);
  //     }, 300);
  //   }, 4000);

  //   const brideTimer = setInterval(() => {
  //     setBrideFade(false);
  //     setTimeout(() => {
  //       setBrideIndex((prev) => (prev + 1) % brideImages.length);
  //       setBrideFade(true);
  //     }, 300);
  //   }, 4000);

  //   return () => {
  //     clearInterval(groomTimer);
  //     clearInterval(brideTimer);
  //   };
  // }, []);

  // const activeImages = modal?.type === 'groom' ? groomImages : brideImages;

  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-6 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-48 pt-8 pb-10">

  {/* Groom */}
  <div className="flex flex-col h-full justify-start">
    <div
      className="relative w-full overflow-hidden cursor-pointer aspect-[3/4] group rounded-md"
      onClick={() => setModal({ type: 'groom', index: groomIndex })}
    >
      {groomImages.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="Groom"
          className={`absolute inset-0 w-full h-full object-cover transition duration-1000 ease-in-out-expo ${
            i === groomIndex
              ? 'opacity-100 visible md:group-hover:scale-105 md:group-hover:brightness-75'
              : 'opacity-0 invisible'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black opacity-5 z-10 pointer-events-none" />
    </div>

    {/* Text */}
    <div className="sm:px-2 py-4 text-center text-[#5f3c2d]">
      <p className="text-2xl md:text-3xl lg:text-3xl allura-regular">IPTU I Gede Agung Sukamara, S.Tr.K.</p>
      <p className="mt-2 text-sm md:text-base font-lora">
        Putra dari <br />
        Bpk. I Komang Kariasa <br />&<br />Ibu Ni Luh Sumarini
      </p>
      <button className='bg-[#704D34] px-4 py-1 rounded-xl mt-2'>
        <a
          href="https://www.instagram.com/agung_sukamara?igsh=MWU2ajdkbzdwcHRqOA=="
          target="_blank"
          rel="noopener noreferrer"
          className="text-md inline-block text-white hover:text-black font-lora"
        >
          <i className="fa-brands fa-instagram mr-1"></i>
          <span>agung_sukamara</span>
        </a>
      </button>
    </div>
  </div>

  {/* Bride */}
  <div className="flex flex-col h-full justify-start">
    <div
      className="relative w-full overflow-hidden cursor-pointer aspect-[3/4] group rounded-md"
      onClick={() => setModal({ type: 'bride', index: brideIndex })}
    >
      {brideImages.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="Bride"
          className={`absolute inset-0 w-full h-full object-cover transition duration-1000 ease-in-out-expo ${
            i === brideIndex
              ? 'opacity-100 visible md:group-hover:scale-105 md:group-hover:brightness-75'
              : 'opacity-0 invisible'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black opacity-5 z-10 pointer-events-none" />
    </div>

    {/* Text */}
    <div className="relative sm:px-2 py-4 text-center text-[#5f3c2d]">
      <p className="text-2xl md:text-3xl lg:text-3xl allura-regular">Dewa Ayu Sri Adnya Dewi, S.E</p>
      <p className="mt-2 text-sm md:text-base font-lora">
        Putri dari <br />
        Bpk.  Letkol (Purn) Drs. Dewa Putu Japa, M.Si. <br />&<br /> Ibu Ni Wayan Rini Apriani
      </p>
      <button className="bg-[#704D34] px-4 py-1 rounded-xl mt-2">
        <a
          href="https://www.instagram.com/adnya_dewi?igsh=MWZwN2d4dXUzMnRwbw=="
          target="_blank"
          rel="noopener noreferrer"
          className="text-md inline-block text-white hover:text-black font-lora"
        >
          <i className="fa-brands fa-instagram mr-1"></i>
          <span>adnya_dewi</span>
        </a>
      </button>
    </div>
  </div>
</div>

  );
}
