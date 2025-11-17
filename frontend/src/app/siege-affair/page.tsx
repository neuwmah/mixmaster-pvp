import React from 'react';
import type { Metadata } from 'next';

import BackgroundMix from '@/components/BackgroundMix';

export const metadata: Metadata = {
  title: 'Siege Affair | MixMaster PVP ⚔️',
};

export default function SiegeAffairPage() {
  return (
    <main className="flex flex-1 bg-gradient-to-b from-black to-(--gray-0) sm:items-center relative">
      <section className="section-siegeaffair section z-[5!important]">
        <div className="container flex flex-col items-center">
  
          <h1 className="title">
            🏰
          </h1>
  
          <div className="flex">
            
          </div>
  
        </div>
      </section>
      <BackgroundMix char1="penril" char2="ditt" />
    </main>
  )
}