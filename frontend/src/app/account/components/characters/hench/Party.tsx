import React from 'react'

import PetCard from '@/app/account/components/characters/hench/pets/Card'

import { Character } from '@/types/character'

interface PartyProps {
  character: Character
}

export default function Party({ character }: PartyProps) {
  return (
    <div className="
      party
      text-base
      flex flex-col gap-8
      w-full max-w-[1000px]
    ">  
      {!character.pets?.length && (
        <p className="text-center">
          No pets in party.
        </p>
      )}

      {character.pets?.length ? (
        <div className="grid gap-[1.6rem] sm:grid-cols-3 xl:grid-cols-3 w-full">
          {character.pets
            .sort((a, b) => b.level - a.level)
            .map(pet => {
              return <PetCard key={pet.id} pet={pet} hench={pet.hench} />
            })}
        </div>
      ) : null}
    </div>
  )
}