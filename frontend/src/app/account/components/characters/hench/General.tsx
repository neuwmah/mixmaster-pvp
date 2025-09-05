'use client'
import React, { useState } from 'react'

import PetInline from '@/app/account/components/characters/hench/pets/Inline'

import { Hench } from '@/types/hench'

interface GeneralProps {
  henches: Hench[]
  selectedHench?: Array<string>
  setSelectedHench?: (value: Array<string>) => void
}

export default function General({ henches, selectedHench = [], setSelectedHench = () => {} }: GeneralProps) {
  return (
    <div className="general text-base flex flex-col gap-8 w-full max-w-[1000px]">
      {Array.isArray(henches) && henches.length > 0 && (
        <div className="flex flex-col gap-6 w-full">
          {henches
            .slice()
            .sort((a, b) => Number(b.active) - Number(a.active) || a.name.localeCompare(b.name))
            .map(h => <PetInline key={h.id} hench={h} selectedHench={selectedHench} setSelectedHench={setSelectedHench} />)}
        </div>
      )}
    </div>
  )
}