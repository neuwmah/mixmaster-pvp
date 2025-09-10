import React from 'react';
import Image from 'next/image';

import { RankSA } from '@/types/ranksa';

interface Classes {
  rankDefault: string;
  rankTop: string;
  rankDown: string;
  rankImage: string;
}

interface CastlesProps {
  ranksa: RankSA[];
  classes: Classes;
}

const Castles: React.FC<CastlesProps> = ({ ranksa, classes }) => {
  const { rankDefault, rankTop, rankDown, rankImage } = classes
  return (
    <div className="castles flex flex-col items-left w-full max-w-full">
      <h2 className="text-big font-bold">
        Siege Affair
      </h2>

      <p className="text-base mt-6 max-w-[32rem] sm:max-w-full">
        Check top castles guild ranking below (top 3).
      </p>

      <table className="table-fixed w-full border-collapse border border-white bg-black mt-10 text-left text-white text-sm">
        <thead>
          <tr>
            <th className={`${rankImage} ${rankTop}`}>
              
            </th>
            <th className={`${rankDefault} ${rankTop}`}>
              Guild
            </th>
            <th className={`${rankDefault} ${rankTop}`}>
              Castles
            </th>
            <th className={`${rankDefault} ${rankTop}`}>
              Members
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 3 }).map((_, i) => {
            const rank = ranksa[i];
            return (
              <tr key={rank?.id || i}>
                <td className={`${rankImage} ${rankDown}`}>
                  <Image
                    unoptimized
                    width={16}
                    height={16}
                    className="object-contain m-auto"
                    src={rank?.guild?.icon || `/assets/images/guilds/guild-icon.png`}
                    alt={`guild-icon`}
                  />
                </td>
                <td className={`${rankDefault} ${rankDown}`}>{rank?.guild?.name ?? '-'}</td>
                <td className={`${rankDefault} ${rankDown}`}>{rank?.guild?.castles_count ?? '-'}</td>
                <td className={`${rankDefault} ${rankDown}`}>{rank?.guild?.members?.length ?? '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <svg className="pointer-events-none rotate-[180deg] scale-x-[-1]" viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg">
        <path className="fill-(--gray-0)" d="M0,0L1440,160L1440,160L0,160Z"></path>
      </svg>
    </div>
  );
};

export default Castles;