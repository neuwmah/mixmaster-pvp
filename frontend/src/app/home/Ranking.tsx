import React from 'react';

import { getRankPVP } from '@/app/api/rankpvp';
import { getRankSA } from '@/app/api/ranksa';

import Kills from '@/app/ranking/components/Kills';
import Castles from '@/app/ranking/components/Castles';

const Ranking: React.FC = async () => {
  const rankpvpData = await getRankPVP();
  const ranksaData = await getRankSA();

  const classes = {
    rankDefault: 'border py-4 px-6 w-1/3 overflow-hidden text-ellipsis',
    rankTop: 'border-(--gray-1) bg-(--gray-0)',
    rankDown: 'border-(--gray-0) text-(--gray-4)',
    rankImage: 'border relative w-[43.4px]'
  }
  
  return rankpvpData.length || ranksaData.length ? (
    <section className="section-ranking section-home">
      <div className="container flex-col items-center">
        
        <div className="flex w-full gap-x-[24px] gap-y-16 sm:px-[64px] flex-col sm:flex-row">
          <Kills rankpvp={rankpvpData} classes={classes} />
          <Castles ranksa={ranksaData} classes={classes} />
        </div>

      </div>
    </section>
  ) : ``
};

export default Ranking;