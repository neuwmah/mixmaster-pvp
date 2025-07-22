import React from 'react';

import { User } from '../type';

interface CharactersProps {
  user: User;
}

export default function Characters({ user }: CharactersProps) {
  const cardsClass = 'info text-ellipsis overflow-hidden min-w-0 p-8 bg-(--black)';
  
  return (
    <section className="section-characters section bg-(--gray-0) py-[48px] sm:py-[64px]">
      <div className="container flex-col items-center">

        <h1 className="title">
          Characters
        </h1>

        <p className="text-base mt-6">
          Check your account characters below.
        </p>

        <div className="text-base grid mt-12 w-full max-w-[1000px] gap-4 grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(3,1fr)]">
          {user.characters.map(character => (
            <div key={character.id} className={cardsClass}>
              <p>Name: <strong>{character.name}</strong></p>
              <p>Status: <strong>{character.status}</strong></p>
              <p>Level: <strong>{character.level}</strong></p>
              <p>Map: <strong>{character.map}</strong></p>
              <p>Exp: <strong>{character.exp}</strong></p>
              <p>Gold: <strong>{character.gold}</strong></p>
              <p>Energy: <strong>{character.attributes.energy}</strong></p>
              <p>Agility: <strong>{character.attributes.agility}</strong></p>
              <p>Accuracy: <strong>{character.attributes.accuracy}</strong></p>
              <p>Luck: <strong>{character.attributes.luck}</strong></p>
              <p>Free points: <strong>{character.free_points}</strong></p>
              <p>Created at: <strong>{character.created_at}</strong></p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};