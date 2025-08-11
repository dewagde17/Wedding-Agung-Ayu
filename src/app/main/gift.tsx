'use client';

import { useEffect, useRef, useState } from 'react';

export default function WeddingGift() {
  const accounts = [
    {
      name: 'BCA',
      bank: 'I Gede Agung Sukamara',
      number: '7720922473',
    },
    {
      name: 'Bank Mandiri',
      bank: 'Dewa Ayu Sri Adnya Dewi',
      number: '1570011177210',
    },
  ];

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

    const [depanVisible, setDepanVisible] = useState(false);
    const [belakangVisible, setBelakangVisible] = useState(false);
  
  
    const DepanRef = useRef(null);
    const BelakangRef = useRef(null);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (entry.target === DepanRef.current) {
                setDepanVisible(true);
              }
              if (entry.target === BelakangRef.current) {
                setBelakangVisible(true);
              }
            }
          });
        },
        {
          threshold: 0.5,
        }
      );
  
      if (DepanRef.current) observer.observe(DepanRef.current);
      if (BelakangRef.current) observer.observe(BelakangRef.current);
  
      return () => {
        if (DepanRef.current) observer.unobserve(DepanRef.current);
        if (BelakangRef.current) observer.unobserve(BelakangRef.current);
      };
    }, []);
  

  return (
    <section className="py-16 px-4 text-center text-[#593131]">
      <h2 className="text-5xl lg:text-6xl text-[#5f3c2d] tangerine-bold">Wedding Gift</h2>
      <img
        src="/img/line-cok.png"
        alt="Ornamen Pembatas"
        className="mx-auto w-60 lg:w-80 mb-4"
      />
      <p className="text-xs md:text-sm lg:text-lg max-w-7xl mx-auto mb-10 font-lora leading-relaxed text-[#5f3c2d]">
        Kehadiran Bapak/Ibu/Saudara/i merupakan hadiah terbaik yang kami
        harapkan. Bila ingin memberikan hadiah dalam bentuk lain, silahkan ketuk tombol dibawah ini.
      </p>

      <div className="max-w-5xl mx-auto space-y-6">
        {accounts.map((item, index) => (
          <div
            
            key={index}
            className="h-16 lg:h-20 flex flex-row text-white rounded-md overflow-hidden"
               
          >
            {/* Nama */}
            <div 
            ref={DepanRef}
            className={`w-1/3 h-full flex px-4 py-3 lg:py-6 items-center justify-between text-left text-sm md:text-base bg-[#875740] lg:text-lg font-semibold font-lora
              ${depanVisible ? "animate__animated animate__fadeInLeft animate__slower" : "opacity-0"}`}>
              {item.name}
            </div>

            {/* Bank & Nomor */}
            <div
             ref={BelakangRef}
             className={`w-2/3 h-full bg-[#704D34] px-4 py-3 lg:py-6 flex justify-between items-center relative font-lora
              ${belakangVisible ? "animate__animated animate__fadeInRight animate__slower" : "opacity-0"} `}>
              <div className="text-left">
                <p className="text-xs md:text-sm lg:text-base">{item.bank}</p>
                <p className="text-[10px] md:text-xs lg:text-sm">{item.number}</p>
              </div>

              {/* Copy Button */}
              <div className="relative flex items-center">
                <button
                  onClick={() => copyToClipboard(item.number, index)}
                  className="bg-[#a67962]/30 hover:bg-[#a67962]/50 p-2 rounded-md transition"
                  title="Salin"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2M16 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2v-2"
                    />
                  </svg>
                </button>

                {/* Notifikasi "Disalin!" */}
                {copiedIndex === index && (
                  <span className="absolute top-0 right-12 bg-white text-[#593131] text-xs px-2 py-1 rounded shadow-md">
                    Disalin!
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
