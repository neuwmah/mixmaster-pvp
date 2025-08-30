import React from 'react';

import { getUser } from '@/app/api/user';

import Card from '@/app/account/components/characters/Card';

import { User } from '@/types/user';

interface CharactersProps {
  user: User;
}

export default function Characters({ user }: CharactersProps) {  
  return (
    <section className="section-characters section">
      <div className="container flex-col items-center">

        <h2 className="title">
          Characters
        </h2>

        <p className="text-base mt-6">
          Check your account characters below.
        </p>

        {user.characters && user.characters.length > 0 &&
          <div className="text-sm grid mt-12 w-full max-w-[1000px] gap-4 grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(3,1fr)]">
            {user.characters.map(async (character) => {
              
              character.user = await getUser(character.userId)

              return <Card key={character.id} {...character} />
            })}
          </div>
        }

      </div>
    </section>
  );
};