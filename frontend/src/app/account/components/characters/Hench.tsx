import React from 'react'

import { Character } from '@/types/character'

interface HenchProps {
  character: Character
  setCharacterHench: (value: Character | false) => void
}

export default function Hench({ character, setCharacterHench }: HenchProps) {
  return (
    <div className="hench mt-12 w-full flex flex-col items-center">
      <div className={`
        pets text-sm
        w-full max-w-[700px]
        flex flex-col p-[2.4rem] bg-(--black) border-[1px] border-(--gray-1) min-h-[28rem] overflow-hidden
      `}>
        {character.pets?.map(pet => 
          <div className="
            pet
          ">
            {pet.nickname}
          </div>
        )}
      </div>

      <button
        className="w-auto button-orange mt-16"
        type="button"
        aria-label="Click to New Character"
        onClick={() => setCharacterHench(false)}
      >
        Save ✨
      </button>
    </div>
  )
}