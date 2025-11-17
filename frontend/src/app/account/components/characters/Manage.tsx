"use client"
import React, { useState } from 'react'

import Card from '@/app/account/components/characters/manage/Card'

import { Hero } from '@/types/user'

interface ManageProps {
  heroes: Hero[] | undefined
  setCreate: (value: boolean) => void
  setItems: (value: Hero | undefined) => void
  setPetsList: (value: Hero | undefined) => void
}

export default function Manage({ heroes, setCreate, setItems, setPetsList }: ManageProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return heroes != undefined && (
    <div className="manage w-full flex flex-col items-center">
      <div
        className={`
          cards mt-12
          text-base
          w-full
          grid gap-[1.6rem] grid-cols-[repeat(1,1fr)]
          sm:flex sm:justify-center
          ${heroes.length >= 3 && 'pb-[1.6rem]'}
        `}
      >
        {heroes.map(hero => (
          <Card
            key={hero.id_idx + '-' + hero.hero_order}
            {...hero}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            setItems={setItems}
            setPetsList={setPetsList}
          />
        ))}
      </div>
      {heroes.length < 3 && (
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