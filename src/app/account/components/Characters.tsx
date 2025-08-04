import React from 'react';

import { User } from '@/types/user';

interface CharactersProps {
  user: User;
}

export default function Characters({ user }: CharactersProps) {
  const cardsClass = 'info text-ellipsis overflow-hidden min-w-0 p-8 bg-(--black) relative';
  
  return (
    <section className="section-characters section">
      <div className="container flex-col items-center">

        <h2 className="title">
          Characters
        </h2>

        <p className="text-base mt-6">
          Check your account characters below.
        </p>

        {user.characters.length > 0 &&
          <div className="text-sm grid mt-12 w-full max-w-[1000px] gap-4 grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(3,1fr)]">
            {user.characters.map(character => (
              <div key={character.id} className={cardsClass}>
                <img 
                  className="absolute top-0 left-0 object-cover w-full h-full opacity-[.7] filter-[brightness(.2)]"
                  src={`/assets/images/characters/${character.class.toLocaleLowerCase()}.jpg`}
                  alt={`char-${character.id}-${character.class}`}
                />
                <div className="relative z-1">
                  <p>Created at: <strong>{new Date(character.created_at).toLocaleDateString()}</strong></p>
                  <p>Name: <strong>{character.name}</strong></p>
                  <p>Class: <strong>{character.class.charAt(0).toUpperCase() + character.class.slice(1).toLowerCase()}</strong></p>
                  <p>Level: <strong>{character.level}</strong></p>
                  <p>Map: <strong>{character.map.charAt(0).toUpperCase() + character.map.slice(1).toLowerCase()}</strong></p>
                  <p>Exp: <strong>{character.exp}</strong></p>
                  <p>Gold: <strong>{character.gold}</strong></p>
                  <p>Energy: <strong>{character.attributes.energy}</strong></p>
                  <p>Agility: <strong>{character.attributes.agility}</strong></p>
                  <p>Accuracy: <strong>{character.attributes.accuracy}</strong></p>
                  <p>Luck: <strong>{character.attributes.luck}</strong></p>
                  <p>Status: <strong>{character.online_status ? 'Online' : 'Offline'}</strong></p>
                  <p>Online time: <strong>{character.online_time}</strong></p>
                  <p>Last connection date: <strong>{new Date(character.last_connection_date).toLocaleDateString()}</strong></p>
                  <p>Last connection IP: <strong>{character.last_connection_ip}</strong></p>
                </div>
              </div>
            ))}
          </div>
        }

      </div>
    </section>
  );
};