import React from 'react';

import Top from './components/Top';
import Hench from '@/app/mix/components/Hench';

export default async function MixPage() {
  return (
    <main>
      <Top />
      <Hench />
    </main>
  );
}