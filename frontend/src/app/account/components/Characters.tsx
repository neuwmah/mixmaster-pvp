import React from 'react';

import Manage from '@/app/account/components/characters/Manage';
import Create from './characters/Create';

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
          {user.characters && user.characters.length > 0 
            ? `Check your account characters below.`
            : `No characters yet. You can create a new below.`
          }
        </p>

        {user.characters && user.characters.length > 0
          ? <Manage characters={user.characters} />
          : <Create user={user} />
        }

      </div>
    </section>
  )
}