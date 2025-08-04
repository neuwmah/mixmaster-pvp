import React from 'react';

import { RankSA } from '@/types/ranksa';

interface CastlesProps {
  ranksa: RankSA[];
}

const Castles: React.FC<CastlesProps> = ({ ranksa }) => {
  const killsDefault = 'border py-4 px-6 w-1/3'
  const killsTop = 'border-(--gray-1) bg-(--gray-0)'
  const killsDown = 'border-(--gray-0) text-(--gray-4)'
  const killsImage = 'border relative w-[43.4px]'

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
            <th className={`${killsImage} ${killsTop}`}>
              
            </th>
            <th className={`${killsDefault} ${killsTop}`}>
              Guild
            </th>
            <th className={`${killsDefault} ${killsTop}`}>
              Master
            </th>
            <th className={`${killsDefault} ${killsTop}`}>
              Castles
            </th>
          </tr>
        </thead>
        <tbody>
          {ranksa.map((rank: RankSA, i) => (
            <tr key={rank.id}>
              <td className={`${killsImage} ${i < 1 ? killsTop : killsDown}`}>
                
              </td>
              <td className={`${killsDefault} ${i < 1 ? killsTop : killsDown}`}>
                {rank.guild && rank.guild.name}
              </td>
              <td className={`${killsDefault} ${i < 1 ? killsTop : killsDown}`}>
                {rank.master && rank.master.name}
              </td>
              <td className={`${killsDefault} ${i < 1 ? killsTop : killsDown}`}>
                {rank.guild && rank.guild.castles_count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Castles;