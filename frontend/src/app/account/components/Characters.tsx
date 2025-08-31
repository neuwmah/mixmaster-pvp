"use client"
import React, { useEffect, useState } from 'react';

import Manage from '@/app/account/components/characters/Manage';
import Create from './characters/Create';

import { User } from '@/types/user';

interface CharactersProps {
  user: User;
}

export default function Characters({ user }: CharactersProps) {
  const [create, setCreate] = useState(false);

  useEffect(() => {
    setCreate(false);
  }, []);

  return (
    <section className="section-characters section">
      <div className="container flex-col items-center">

        <h2 className="title">
          Characters 👥
        </h2>

        <p className={`text-base mt-6 text-center ${!user.characters?.length && 'max-w-[24rem] sm:max-w-[100%]'}`}>
          {user.characters?.length
            ? `Check your account characters below.`
            : `No characters yet. You can create a new one below.`
          }
        </p>

        {!user.characters?.length || create
          ? <Create user={user} setCreate={setCreate} />
          : <Manage characters={user.characters} setCreate={setCreate} />
        }

      </div>
    </section>
  )
}