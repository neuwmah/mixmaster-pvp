import React from 'react'

import PetComponent from '@/app/account/components/characters/hench/pets/Pet'

import { Character } from '@/types/character'

interface HenchProps {
  character: Character
}

export default function Pets({ character }: HenchProps) {
  return (
    <div className="
      pets
      text-base
      flex flex-col gap-8
      w-full max-w-[1000px]
    ">  
      {!character.pets?.length && (
        <p className="text-center">
          No pets for this character.
        </p>
      )}

      {character.pets?.length ? (
        <div className="grid gap-12 sm:grid-cols-2 xl:grid-cols-3 w-full">
          {character.pets
            .sort((a, b) => a.level - b.level)
            .map(pet => {
              return <PetComponent pet={pet} key={pet.id} />
            })}
        </div>
      ) : null}
    </div>
  )
}