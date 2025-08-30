import React from 'react';

import { RankPVP } from '@/types/rankpvp';

interface KillsProps {
  rankpvp: RankPVP[];
}

const Kills: React.FC<KillsProps> = ({ rankpvp }) => {
  const killsDefault = 'border py-4 px-6 w-1/3'
  const killsTop = 'border-(--gray-1) bg-(--gray-0)'
  const killsDown = 'border-(--gray-0) text-(--gray-4)'
  const killsImage = 'border relative w-[43.4px]'

  return (
    <div className="kills flex flex-col items-left w-full max-w-full">
      <h2 className="text-base font-bold">
        PVP
      </h2>

      <p className="text-sm mt-4">
        Check top kills player ranking below (top 5).
      </p>

      <table className="table-fixed w-full border-collapse border border-white bg-black mt-6 text-left text-white text-sm">
        <thead>
          <tr>
            <th className={`${killsImage} ${killsTop}`}>
              
            </th>
            <th className={`${killsDefault} ${killsTop}`}>
              Player
            </th>
            <th className={`${killsDefault} ${killsTop}`}>
              Guild
            </th>
            <th className={`${killsDefault} ${killsTop}`}>
              Kills
            </th>
          </tr>
        </thead>
        <tbody>
          {rankpvp.map(async (rank: RankPVP, i) => (
            <tr key={rank.id}>
              <td className={`${killsImage} ${i < 3 ? killsTop : killsDown}`}>
                {rank.player &&
                  <img 
                    className="absolute top-0 left-0 object-cover w-full h-full p-2 rounded-full"
                    src={`/assets/images/characters/${rank.player.class.toLocaleLowerCase()}.jpg`} 
                    alt={`${rank.player.name} class`}
                  />
                }
              </td>
              <td className={`${killsDefault} ${i < 3 ? killsTop : killsDown}`}>
                {rank.player && rank.player.name}
              </td>
              <td className={`${killsDefault} ${i < 3 ? killsTop : killsDown} ${rank.player && rank.player.name == rank.guild.master.name ? 'text-(--primary-red-2)' : ''}`}>
                {rank.guild && rank.guild.name}
              </td>
              <td className={`${killsDefault} ${i < 3 ? killsTop : killsDown}`}>
                {rank.player && rank.player.kills_count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Kills;