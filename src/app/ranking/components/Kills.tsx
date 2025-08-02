import React from 'react';

import { RankPVP } from '@/types/rankpvp';

interface KillsProps {
  rankpvp: RankPVP[];
}

const Kills: React.FC<KillsProps> = ({ rankpvp }) => {
  const killsDefault = 'border py-4 px-6 w-1/3'
  const killsTop = 'border-(--gray-1) bg-(--gray-0)'
  const killsDown = 'border-(--gray-0) text-(--gray-4)'

  return (
    <div className="kills flex flex-col items-left w-full max-w-full">
      <h2 className="text-base font-bold">
        PVP
      </h2>

      <p className="text-sm mt-4">
        Check top kills player ranking below.
      </p>

      <table className="table-fixed w-full border-collapse border border-white bg-black mt-6 text-left text-white text-sm">
        <thead>
          <tr>
            <th className={`${killsDefault} ${killsTop}`}>
              Kills
            </th>
            <th className={`${killsDefault} ${killsTop}`}>
              Player
            </th>
            <th className={`${killsDefault} ${killsTop}`}>
              Guild
            </th>
          </tr>
        </thead>
        <tbody>
          {rankpvp.map((rank: RankPVP, i) => (
            <tr key={rank.id}>
              <td className={`${killsDefault} ${i < 3 ? killsTop : killsDown}`}>
                {rank.kills_count}
              </td>
              <td className={`${killsDefault} ${i < 3 ? killsTop : killsDown}`}>
                {rank.character_id}
              </td>
              <td className={`${killsDefault} ${i < 3 ? killsTop : killsDown}`}>
                {rank.guild_id}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Kills;