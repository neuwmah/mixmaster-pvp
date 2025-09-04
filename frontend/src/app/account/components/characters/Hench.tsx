import React from 'react'

import Pets from '@/app/account/components/characters/hench/Pets'

import { Character } from '@/types/character'

interface HenchProps {
  character: Character
  setCharacterHench: (value: Character | false) => void
}

export default function Hench({ character, setCharacterHench }: HenchProps) {
  return (
    <div className="hench mt-12 w-full flex flex-col items-center">
      <Pets character={character} />

      <button
        className="w-auto button-orange mt-16"
        type="button"
        aria-label="Close Pets"
        onClick={() => setCharacterHench(false)}
      >
        Save ✨
      </button>
    </div>
  )
}