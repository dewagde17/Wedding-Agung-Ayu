'use client';

import { useState } from 'react';
import Home from './home';
import LoadingScreen from './loading';

export default function Page() {
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <>
      {!loadingDone ? (
        <LoadingScreen onFinish={() => setLoadingDone(true)} />
      ) : (
        <Home />
      )}
    </>
  );
}
