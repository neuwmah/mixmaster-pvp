import React, { useState } from 'react'

import General from '@/app/account/components/characters/hench/General'

import { Character } from '@/types/character'

interface HenchCreateProps {
  character: Character | false
  setCharacterHenchCreate: (value: boolean) => void
}

export default function HenchCreate({ character, setCharacterHenchCreate }: HenchCreateProps) {
  return (
    <div className="hench-create mt-12 w-full flex flex-col items-center">
      <General character={character} />

      <div className="mt-16 flex items-center gap-4">
        <button
          className="w-auto button-gray"
          type="button"
          aria-label="Close Pets"
          onClick={() => setCharacterHenchCreate(false)}
        >
          Return
        </button>
        <button
          className="w-auto button-orange"
          type="submit"
          aria-label="Add New Pet"
        >
          Create ✨
        </button>
      </div>
    </div>
  )
}