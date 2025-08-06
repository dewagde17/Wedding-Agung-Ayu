'use client';

import { useEffect, useState } from 'react';

export default function BrowserWarning() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isSamsungInternet = /SamsungBrowser/i.test(userAgent);

    if (isSamsungInternet) {
      setShowWarning(true);
    }
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg max-w-sm p-6 text-center">
        <h2 className="text-lg font-semibold mb-2">PERINGATAN!</h2>
        <p className="text-sm mb-4">
          Browser yang Anda gunakan (Samsung Internet) tidak dapat menampilkan website ini dengan baik. Anda dapat mematikan mode darkmode pada pengaturan browser, atau gunakan browser lain seperti:
        </p>
        <p className="text-sm font-semibold">Google Chrome, Firefox, atau Opera.</p>
        <button
          onClick={() => setShowWarning(false)}
          className="mt-4 px-4 py-2 bg-white text-black rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
}
