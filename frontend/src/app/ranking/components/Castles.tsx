import React from 'react';

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
      <h2 className="text-base font-bold">
        Siege Affair
      </h2>

      <p className="text-sm mt-4">
        Check top castles guild ranking below (top 3).
      </p>

      <table className="table-fixed w-full border-collapse border border-white bg-black mt-6 text-left text-white text-sm">
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
          {ranksa.map((rank: RankSA, i) => (
            <tr key={rank.id}>
              <td className={`${rankImage} ${i < 1 ? rankTop : rankDown}`}></td>
              <td className={`${rankDefault} ${i < 1 ? rankTop : rankDown}`}>{rank.guild?.name ?? '-'}</td>
              <td className={`${rankDefault} ${i < 1 ? rankTop : rankDown}`}>{rank.guild?.castles_count ?? 0}</td>
              <td className={`${rankDefault} ${i < 1 ? rankTop : rankDown}`}>{rank.guild?.members_count ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Castles;