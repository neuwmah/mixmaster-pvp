import React from 'react';

import { Character } from '@/types/character';

export default function Infos(character: Character) {
  return <>
    <p>Name: <strong>{character.name}</strong></p>
    <p>Class: <strong>{character.class.charAt(0).toUpperCase() + character.class.slice(1).toLowerCase()}</strong></p>
    <p>Energy: <strong>{character.energy}</strong></p>
    <p>Agility: <strong>{character.agility}</strong></p>
    <p>Accuracy: <strong>{character.accuracy}</strong></p>
    <p>Luck: <strong>{character.luck}</strong></p>
    <p>Map: <strong>{character.map.charAt(0).toUpperCase() + character.map.slice(1).toLowerCase()}</strong></p>
    <p>Created at: <strong>{new Date(character.created_at).toLocaleDateString()}</strong></p>
    <p>Online status: <strong>{character.online_status ? 'Online' : 'Offline'}</strong></p>
    <p>Online time: <strong>{character.online_time}</strong></p>
    <p>Last connection: <strong>{character.last_connection_date ? new Date(character.last_connection_date).toLocaleDateString() : 'N/A'}</strong></p>
    <p>Last connection IP: <strong>{character.last_connection_ip || 'N/A'}</strong></p>
  </>
}