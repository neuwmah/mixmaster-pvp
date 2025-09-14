import React from 'react';

import { Character } from '@/types/character';

export default function Infos(character: Character) {
  return <div className="infos h-full w-full flex flex-col">
    <p className="mb-[1.6rem]"><strong>{character.name}</strong></p>
    <p>Energy: <strong>{character.energy}</strong></p>
    <p>Agility: <strong>{character.agility}</strong></p>
    <p>Accuracy: <strong>{character.accuracy}</strong></p>
    <p className="mb-[1.6rem]">Luck: <strong>{character.luck}</strong></p>
    <p>Online status: <strong>{character.online_status ? 'Online' : 'Offline'}</strong></p>
    <p>Online time: <strong>{character.online_time}</strong></p>
    <p>Last connection: <strong>{character.last_connection_date ? new Date(character.last_connection_date).toLocaleDateString() : 'N/A'}</strong></p>
    <p>Last connection IP: <strong>{character.last_connection_ip || 'N/A'}</strong></p>
  </div>
}