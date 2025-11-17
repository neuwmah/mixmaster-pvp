import React from 'react';
import Image from 'next/image';

import { RankHero } from '@/types/hero';

interface HeroRankProps {
  heroes: RankHero[];
}

const getHeroTypeName = (heroType: number): string => {
  const types: { [key: number]: string } = {
    0: "ditt",
    1: "jin", 
    2: "penril",
    3: "phoy"
  };
  return types[heroType] || "ditt";
};

const formatNumber = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const HeroRank: React.FC<HeroRankProps> = ({ heroes }) => {
  const rankDefault = 'border py-4 px-6 overflow-hidden text-ellipsis';
  const rankTop = 'border-(--gray-1) bg-(--gray-0)';
  const rankDown = 'border-(--gray-0) text-(--gray-4)';
  const rankImage = 'border relative w-[43.4px]';
  
  return (
    <section className="section relative !z-5">
      <div className="container flex justify-center">
        <div className="w-full max-w-[700px] overflow-x-auto border-(--gray-0) border-x-1 sm:border-x-0">
          <table className="min-w-[600px] w-full border-collapse border border-black bg-black text-left text-white text-sm whitespace-nowrap">
          <thead>
            <tr>
              <th className={`${rankImage} ${rankTop}`}>
              </th>
              <th className={`${rankImage} ${rankTop}`}>
              </th>
              <th className={`${rankDefault} ${rankTop}`}>
                Player
              </th>
              <th className={`${rankDefault} ${rankTop} w-70`}>
                Level
              </th>
              <th className={`${rankDefault} ${rankTop}`}>
                EXP
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 99 }).map((_, i) => {
              const rank = heroes[i];
              return (
                <tr key={rank?.id || i}>
                  <td className={`${rankImage} ${rankDown} text-center font-bold`}>
                    <span>{i + 1}</span>
                  </td>
                  <td className={`${rankImage} ${rankDown} p-2 flex justify-center items-center`}>
                    {rank?.hero ? (
                      <Image 
                        src={`/assets/images/characters/${getHeroTypeName(rank.hero.hero_type)}.jpg`}
                        alt={getHeroTypeName(rank.hero.hero_type)}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : null}
                  </td>
                  <td className={`${rankDefault} ${rankDown}`}>
                    {rank?.hero ? (
                      <div className="flex items-center gap-4">
                        <span>
                          {rank.hero.name}
                        </span>
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className={`${rankDefault} ${rankDown}`}>
                    {rank?.hero?.baselevel ?? '-'}
                  </td>
                  <td className={`${rankDefault} ${rankDown}`}>
                    {rank?.hero ? formatNumber(rank.hero.exp) : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </section>
  );
};

export default HeroRank;
