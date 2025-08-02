import React from 'react';

import { getRankPVP } from '@/app/api/rankpvp';
import { getRankSA } from '@/app/api/ranksa';

import Kills from '@/app/ranking/components/Kills';
import Castles from '@/app/ranking/components/Castles';

export default async function RankingPage() {
  const rankpvpData = await getRankPVP();
  const ranksaData = await getRankSA();

  return (
    <main className="flex flex-1 bg-gradient-to-b from-black to-(--gray-0) sm:items-center">
      <section className="section-ranking section">
        <div className="container flex-col items-center">

          <h1 className="title text-center w-full hidden">
            Ranking ⭐
          </h1>
          
          <div className="flex w-full gap-x-[24px] gap-y-16 sm:px-[64px] flex-col sm:flex-row">
            <Kills rankpvp={rankpvpData} />
            <Castles ranksa={ranksaData} />
          </div>
          
        </div>
      </section>
    </main>
  );
}