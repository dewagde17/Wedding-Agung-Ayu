'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onFinish(); // Setelah progress 100, lanjut ke Home
          }, 500); // Bisa dikasih delay jika mau transisi smooth
        }
        return next;
      });
    }, 20); // Kecepatan loading (misal 100x20ms = 2 detik)

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black transition-opacity duration-500">
      <div className="text-xl text-white font-semibold mb-4">Loading {progress}%</div>
      <div className="w-64 h-2 bg-blackrounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
