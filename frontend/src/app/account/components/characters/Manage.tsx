import React from 'react';

import Card from '@/app/account/components/characters/Card';

import { Character } from '@/types/character';

interface ManageProps {
  characters: Character[];
  setCreate: (value: boolean) => void;
}

export default function Manage({ characters, setCreate }: ManageProps) {
  return (
    <div className="manage w-full flex flex-col items-center">
      <div
        className={`
          mt-12
          text-sm
          w-full max-w-[1000px]
          grid gap-[1.6rem] grid-cols-[repeat(1,1fr)] 
          sm:flex sm:justify-center sm:flex-wrap
          ${characters.length >= 3 &&
            'pb-[1.6rem]'
          }
        `}
      >
        {characters.map((character, i) => (
          <Card {...character} key={i} />
        ))}
      </div>
      {characters.length < 3 &&
        <button className="w-auto button-orange mt-16" type="button" aria-label="Click to New Character" onClick={() => { setCreate(true) }}>
          New Character ✨
        </button>
      }
    </div>
  )
}