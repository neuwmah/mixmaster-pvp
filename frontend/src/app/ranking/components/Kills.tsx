import React from 'react';
import Image from 'next/image';

import { RankPVP } from '@/types/rankpvp';

interface Classes {
  rankDefault: string;
  rankTop: string;
  rankDown: string;
  rankImage: string;
}

interface KillsProps {
  rankpvp: RankPVP[];
  classes: Classes;
}

const Kills: React.FC<KillsProps> = ({ rankpvp, classes }) => {
  const { rankDefault, rankTop, rankDown, rankImage } = classes
  return (
    <div className="kills flex flex-col items-left w-full max-w-full">
      <h2 className="text-big font-bold">
        PVP
      </h2>

      <p className="text-base mt-6 max-w-[32rem] sm:max-w-full">
        Check top kills player ranking below (top 5).
      </p>

      <table className="table-fixed w-full border-collapse border border-white bg-black mt-10 text-left text-white text-sm">
        <thead>
          <tr>
            <th className={`${rankImage} ${rankTop}`}>
              
            </th>
            <th className={`${rankDefault} ${rankTop}`}>
              Player
            </th>
            <th className={`${rankDefault} ${rankTop}`}>
              Guild
            </th>
            <th className={`${rankDefault} ${rankTop}`}>
              Kills
            </th>
          </tr>
        </thead>
        <tbody>
          {rankpvp.map((rank: RankPVP) => (
            <tr key={rank.id}>
              <td className={`${rankImage} ${rankDown}`}>
                {rank.player && (
                  <Image
                    unoptimized
                    width={90}
                    height={90}
                    className="absolute top-0 left-0 object-cover w-full h-full p-2 rounded-full"
                    src={`/assets/images/characters/${rank.player.class?.toLocaleLowerCase?.()}.jpg`}
                    alt={`${rank.player.name} class`}
                  />
                )}
              </td>
              <td className={`${rankDefault} ${rankDown}`}>
                {rank.player?.name}
              </td>
              <td className={`${rankDefault} ${rankDown} ${
                rank.guild?.master?.name === rank.player?.name ? 'text-(--primary-red-1)' : ''
              }`}>
                {rank.guild?.name ?? '-'}
              </td>
              <td className={`${rankDefault} ${rankDown}`}>
                {rank.player?.kills_count ?? 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <svg className="pointer-events-none rotate-[180deg] scale-x-[-1]" viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg">
        <path className="fill-(--gray-1)" d="M0,160L1440,0L1440,160L0,160Z"></path>
      </svg>
    </div>
  );
};

export default Kills;