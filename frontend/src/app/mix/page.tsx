import React from 'react';
import type { Metadata } from 'next';

import Top from './components/Top';
import Hench from '@/app/mix/components/Hench';

export const metadata: Metadata = {
  title: 'Database | MixMaster PVP ⚔️',
};

export default async function MixPage() {
  return (
    <main>
      <Top />
      <Hench />
    </main>
  );
}