import React from 'react'

import Party from '@/app/account/components/characters/hench/Party'
import Bag from '@/app/account/components/characters/hench/Bag'

import { Character } from '@/types/character'

interface HenchProps {
  character: Character
  setCharacterHench: (value: Character | false) => void
  setCharacterHenchCreate: (value: boolean) => void
}

export default function Hench({ character, setCharacterHench, setCharacterHenchCreate }: HenchProps) {
  return (
    <div className="hench mt-12 w-full flex flex-col items-center">
      <Party character={character} />
      <Bag character={character} setCharacterHench={setCharacterHench} />

      <div className="mt-16 flex items-center gap-4">
        <button
          className="w-auto button-gray"
          type="button"
          aria-label="Close Pets"
          onClick={() => setCharacterHench(false)}
        >
          Save
        </button>
        <button
          className="w-auto button-orange"
          type="button"
          aria-label="Add New Pet"
          onClick={() => setCharacterHenchCreate(true)}
        >
          New Pet ✨
        </button>
      </div>
    </div>
  )
}