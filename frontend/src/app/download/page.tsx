import React from 'react';

import Download from './components/Download';
import Bugs from './components/Bugs';
import FAQ from './components/FAQ';

import BackgroundMix from '@/components/BackgroundMix';

export default async function DownloadPage() {
  return (
    <main>
      <div className="relative">
        <Download />
        <Bugs />
        {/* <BackgroundMix char1="penril" char2="ditt" /> */}
      </div>
      <FAQ />
    </main>
  );
}