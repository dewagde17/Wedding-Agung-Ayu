'use client';

import { useState } from 'react';
import Home from './home';
import LoadingScreen from './loading';
import BrowserWarning from './warning';

export default function Page() {
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <>
      {!warningDismissed ? (
        <BrowserWarning onDismiss={() => setWarningDismissed(true)} />
      ) : !loadingDone ? (
        <LoadingScreen onFinish={() => setLoadingDone(true)} />
      ) : (
        <Home />
      )}
    </>
  );
}
