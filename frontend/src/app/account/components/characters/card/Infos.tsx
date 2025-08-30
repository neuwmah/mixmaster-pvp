import React from 'react';

import { Character } from '@/types/character';

export default function Infos(character: Character) {
  return <>
    <p>Created at: <strong>{new Date(character.created_at).toLocaleDateString()}</strong></p>
    <p>Name: <strong>{character.name}</strong></p>
    <p>Class: <strong>{character.class.charAt(0).toUpperCase() + character.class.slice(1).toLowerCase()}</strong></p>
    <p>Level: <strong>{character.level}</strong></p>
    <p>Map: <strong>{character.map.charAt(0).toUpperCase() + character.map.slice(1).toLowerCase()}</strong></p>
    <p>Status: <strong>{character.online_status ? 'Online' : 'Offline'}</strong></p>
    <p>Online time: <strong>{character.online_time}</strong></p>
    <p>Last connection: <strong>{new Date(character.last_connection_date).toLocaleDateString()}</strong></p>
    <p>Last connection IP: <strong>{character.last_connection_ip}</strong></p>
  </>
}