import React from 'react';
import type { Metadata } from 'next';

import { getHeroRanking } from '@/app/api/hero';

import Top from '@/app/ranking/components/Top';
import HeroRank from '@/app/ranking/components/HeroRank';

export const metadata: Metadata = {
  title: 'Ranking | MixMaster PVP ⚔️',
};

export default async function RankingPage() {
  const heroData = await getHeroRanking();

  return (
    <main>
      <Top />
      <HeroRank heroes={heroData} />
    </main>
  );
}