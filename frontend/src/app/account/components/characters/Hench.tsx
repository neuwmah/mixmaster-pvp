import React from 'react'

import { Character } from '@/types/character'

interface HenchProps {
  character: Character
  setCharacterHench: (value: Character | false) => void
}

export default function Hench({ character, setCharacterHench }: HenchProps) {
  function formatDate(d?: string | Date | null) {
    if (!d) return 'N/A'
    try { return new Date(d).toLocaleDateString() } catch { return 'N/A' }
  }

  return (
    <div className="hench mt-12 w-full flex flex-col items-center">
      <div className="
        pets
        text-base 
        flex flex-col
        gap-8 p-[2.4rem] 
        w-full max-w-[1000px] min-h-[28rem]
        bg-(--black) border-[1px] border-(--gray-1) 
      ">  
        {!character.pets?.length && (
          <p className="opacity-60">
            No pets for this character.
          </p>
        )}
        {character.pets?.map(pet => {
          const hench = pet.hench
          const displayName = pet.nickname || hench?.name || 'Unnamed'
          return (
            <div key={pet.id} className="pet border border-(--gray-1) p-4 flex flex-col gap-1 bg-(--black)">
              <p>Name: <strong>{displayName}</strong></p>
              <p>Hench: <strong>{hench ? hench.name : '—'}</strong></p>
              <p>Type: <strong>{hench?.type || '—'}</strong></p>
              <p>Base level: <strong>{hench?.base_level ?? '—'}</strong></p>
              <p>Current level: <strong>{pet.level}</strong></p>
              <p>Exp: <strong>{pet.exp}</strong></p>
              <p>In party: <strong>{pet.in_party ? 'Yes' : 'No'}</strong></p>
              <p>Slot: <strong>{pet.slot ?? '—'}</strong></p>
            </div>
          )
        })}
      </div>

      <button
        className="w-auto button-orange mt-16"
        type="button"
        aria-label="Close Pets"
        onClick={() => setCharacterHench(false)}
      >
        Close ✨
      </button>
    </div>
  )
}