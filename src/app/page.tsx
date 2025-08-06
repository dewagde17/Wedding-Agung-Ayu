'use client'

import { Suspense } from 'react';
import Home from './home';
import LoadingScreen from './loading';

export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Home />
    </Suspense>
  );
}
