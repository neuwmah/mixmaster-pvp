import React from 'react'

import PetInline from '@/app/account/components/hench/pets/Inline'

import { Character } from '@/types/character'

interface BagProps {
  character: Character
  setPetsList: (value: Character | undefined) => void
}

export default function Bag({ character, setPetsList }: BagProps) {
  return (
    <div className="
      bag
      text-base
      flex flex-col gap-[1.6rem]
      w-full max-w-[1000px]
    ">  
      {!character.pets?.length && (
        <p className="text-center">
          No pets found.
        </p>
      )}

      {character.pets?.length ? (
        <div className="flex flex-col gap-[1px] w-full">
          {character.pets
            .slice()
            .sort((a, b) => (Number(b.in_party) - Number(a.in_party)))
            .map((pet, i) => <PetInline pet={pet} hench={pet.hench} key={`bag${i}`} character={character} setPetsList={setPetsList} />)}
        </div>
      ) : null}
    </div>
  )
}