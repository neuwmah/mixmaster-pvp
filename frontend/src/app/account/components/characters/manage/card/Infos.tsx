import React from 'react';

import { Hero } from '@/types/user';

export default function Infos(hero: Hero) {
  return <div className="infos h-full w-full flex flex-col">
    <p className="mb-[1.6rem]"><strong>{hero.name}</strong></p>
    <p>Level: <strong>{hero.baselevel}</strong></p>
    <p>Resets: <strong>{hero.resets}</strong></p>
    <p>STR: <strong>{hero.str}</strong></p>
    <p>DEX: <strong>{hero.dex}</strong></p>
    <p>AIM: <strong>{hero.aim}</strong></p>
    <p className="mb-[1.6rem]">LUCK: <strong>{hero.luck}</strong></p>
    <p>Gold: <strong>{hero.gold.toLocaleString()}</strong></p>
    <p>Status: <strong>{hero.login ? 'Online' : 'Offline'}</strong></p>
  </div>
}