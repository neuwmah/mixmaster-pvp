import React from 'react';

import { RankSA } from '@/types/ranksa';

interface CastlesProps {
  ranksa: RankSA[];
}

const Castles: React.FC<CastlesProps> = ({ ranksa }) => {
  const killsDefault = 'border py-4 px-6 w-1/3'
  const killsTop = 'border-(--gray-1) bg-(--gray-0)'
  const killsDown = 'border-(--gray-0) text-(--gray-4)'

  return (
    <div className="castles flex flex-col items-left w-full max-w-full">
      <h2 className="text-base font-bold">
        Siege Affair
      </h2>

      <p className="text-sm mt-4">
        Check top castles guild ranking below.
      </p>

      <table className="table-fixed w-full border-collapse border border-white bg-black mt-6 text-left text-white text-sm">
        <thead>
          <tr>
            <th className={`${killsDefault} ${killsTop}`}>
              Castles
            </th>
            <th className={`${killsDefault} ${killsTop}`}>
              Guild
            </th>
            <th className={`${killsDefault} ${killsTop}`}>
              Master
            </th>
          </tr>
        </thead>
        <tbody>
          {ranksa.map((rank: RankSA, i) => (
            <tr key={rank.id}>
              <td className={`${killsDefault} ${i < 1 ? killsTop : killsDown}`}>
                {rank.castles}
              </td>
              <td className={`${killsDefault} ${i < 1 ? killsTop : killsDown}`}>
                {rank.guild}
              </td>
              <td className={`${killsDefault} ${i < 1 ? killsTop : killsDown}`}>
                {rank.master}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Castles;