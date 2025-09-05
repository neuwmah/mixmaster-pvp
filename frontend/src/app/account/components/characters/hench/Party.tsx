import React, { useEffect, useState } from 'react'

import PetCard from '@/app/account/components/characters/hench/pets/Card'

import { Character } from '@/types/character'
import { Pet } from '@/types/pet'

interface PartyProps {
  character: Character
}

export default function Party({ character }: PartyProps) {
  const [partyPets, setPartyPets] = useState<Pet[]>([])

  useEffect(() => {
    const filtered = character.pets?.filter(p => p.in_party) || []
    setPartyPets(filtered)
  }, [character.pets])

  return partyPets.length > 0 && (
    <div className="
      party
      text-base
      flex flex-col gap-8
      w-full max-w-[1000px] mb-[1.6rem]
    "> 
      <div className="grid gap-[1.6rem] sm:grid-cols-3 xl:grid-cols-3 w-full">
        {partyPets
          .sort((a, b) => b.level - a.level)
          .map(pet => (
            <PetCard key={pet.id} pet={pet} hench={pet.hench} />
          ))}
      </div>
    </div>
  )
}