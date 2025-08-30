import React from 'react';

import { getRankPVP } from '@/app/api/rankpvp';
import { getRankSA } from '@/app/api/ranksa';

import Kills from '@/app/ranking/components/Kills';
import Castles from '@/app/ranking/components/Castles';

const Ranking: React.FC = async () => {
  const rankpvpData = await getRankPVP();
  const ranksaData = await getRankSA();
  
  return rankpvpData.length || ranksaData.length ? (
    <section className="section-ranking section-home">
      <div className="container flex-col items-center">
        
        <div className="flex w-full gap-x-[24px] gap-y-16 sm:px-[64px] flex-col sm:flex-row">
          <Kills rankpvp={rankpvpData} />
          <Castles ranksa={ranksaData} />
        </div>

      </div>
    </section>
  ) : ``
};

export default Ranking;