import React from 'react';

import Download from './components/Download';
import Bugs from './components/Bugs';
import FAQ from './components/FAQ';

export default async function DownloadPage() {
  return (
    <main>
      <Download />
      <Bugs />
      <FAQ />
    </main>
  );
}