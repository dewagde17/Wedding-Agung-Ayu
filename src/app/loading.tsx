'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinishAction }: { onFinishAction: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onFinishAction(); // Setelah progress 100, lanjut ke Home
          }, 500); // Bisa dikasih delay jika mau transisi smooth
        }
        return next;
      });
    }, 40); // Kecepatan loading (misal 100x20ms = 2 detik)

    return () => clearInterval(interval);
  }, [onFinishAction]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black transition-opacity duration-500">
      <div className="flex flex-col text-white mb-1 items-center text-center gap-y-1">
        <h1 className="text-[10px] sm:text-xs font-lora">THE WEDDING OF</h1>
         <img src="/img/logo-wed.png" alt="Logo" className="w-12 sm:w-14 lg:w-16 z-5" />
        <h1 className="text-2xl sm:text-3xl lg:text-3xl allura-regular">
          Agung <span className="text-3xl allura-regular">&amp;</span> Ayu
        </h1>
      </div>
      <div className="text-xs sm:text-sm lg:text-base text-white font-lora mb-4">Loading {progress}%</div>
      <div className="w-64 h-2 bg-blackrounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
