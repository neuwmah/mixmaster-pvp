import React from 'react';
import type { Metadata } from 'next';

import Download from '@/app/download/components/Download';
import Bugs from '@/app/download/components/Bugs';
import FAQ from '@/app/download/components/FAQ';

export const metadata: Metadata = {
  title: 'Download | MixMaster PVP ⚔️',
};

export default async function DownloadPage() {
  return (
    <main>
      <div className="relative">
        <Download />
        <Bugs />
      </div>
      <FAQ />
    </main>
  );
}