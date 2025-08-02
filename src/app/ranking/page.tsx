import React from 'react';

import { getRankPVP } from '@/app/api/rankpvp';
import { getRankSA } from '@/app/api/ranksa';

import Kills from '@/app/ranking/components/Kills';
import Castles from '@/app/ranking/components/Castles';

export default async function RankingPage() {
  const rankpvpData = await getRankPVP();
  const ranksaData = await getRankSA();

  return (
    <section className="section-ranking section">
      <div className="container flex-col items-center">

        <h1 className="title text-center w-full">
          Ranking ⭐
        </h1>

        <p className="text-xs text-center mt-2 text-(--gray-4)">
          Last updated at 07/20/2025
        </p>
        
        <div className="flex w-full gap-x-[24px] gap-y-16 mt-12 sm:px-[64px] flex-col sm:flex-row">
          <Kills rankpvp={rankpvpData} />
          <Castles ranksa={ranksaData} />
        </div>
        
      </div>
    </section>
  );
}