import React from 'react';

import { getRankPVP } from '@/api/rankpvp';
import { getRankSA } from '@/api/ranksa';

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
        
        <div className="w-full flex flex-col mt-12 gap-y-12 max-w-[500px]">
          <Kills rankpvp={rankpvpData} />
          <Castles ranksa={ranksaData} />
        </div>

        <p className="text-sm mt-12 text-right w-full max-w-[500px]">
          Last updated at 07/23/2025
        </p>
        
      </div>
    </section>
  );
}