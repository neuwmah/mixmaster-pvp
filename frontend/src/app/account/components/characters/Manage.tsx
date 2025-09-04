"use client"
import React, { useState } from 'react'

import Card from '@/app/account/components/characters/manage/Card'

import { Character } from '@/types/character'

interface ManageProps {
  characters: Character[]
  setCreate: (value: boolean) => void
  setCharacterHench: (value: Character | false) => void
}

export default function Manage({ characters, setCreate, setCharacterHench }: ManageProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="manage w-full flex flex-col items-center">
      <div
        className={`
          mt-12
          text-sm
          w-full max-w-[1000px]
          grid gap-[1.6rem] grid-cols-[repeat(1,1fr)]
          sm:flex sm:justify-center
          ${characters.length >= 3 && 'pb-[1.6rem]'}
        `}
      >
        {characters.map(character => (
          <Card
            key={character.id}
            {...character}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            setCharacterHench={setCharacterHench}
          />
        ))}
      </div>
      {characters.length < 3 && (
        <button
          className="w-auto button-orange mt-16"
          type="button"
          aria-label="Click to New Character"
          onClick={() => setCreate(true)}
        >
          New Character ✨
        </button>
      )}
    </div>
  )
}