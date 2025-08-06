'use client';

import { useState } from 'react';
import Home from './home';
import LoadingScreen from './loading';
import BrowserWarning from './warning'; // pastikan path sesuai

export default function Page() {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <>
      <BrowserWarning />
      {!loadingDone ? (
        <LoadingScreen onFinish={() => setLoadingDone(true)} />
      ) : (
        <Home />
      )}
    </>
  );
}
