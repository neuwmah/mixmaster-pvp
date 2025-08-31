import React from 'react';

import { getUser } from '@/app/api/user';

import Card from '@/app/account/components/characters/Card';

import { Character } from '@/types/character';

interface ManageProps {
  characters: Character[];
}

export default function Manage({ characters }: ManageProps) {
  return (
    <div className="text-sm grid mt-12 w-full max-w-[1000px] gap-4 grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(3,1fr)]">
      {characters.map(async (character) => {
        
        character.user = await getUser(character.userId)

        return <Card key={character.id} {...character} />
      })}
    </div>
  )
}