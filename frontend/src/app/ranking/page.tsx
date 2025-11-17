import React from 'react';

import { getHeroRanking } from '@/app/api/hero';

import Top from '@/app/ranking/components/Top';
import HeroRank from '@/app/ranking/components/HeroRank';

export default async function RankingPage() {
  const heroData = await getHeroRanking();

  return (
    <main>
      <Top />
      <HeroRank heroes={heroData} />
    </main>
  );
}