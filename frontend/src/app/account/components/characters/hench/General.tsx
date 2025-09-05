'use client'
import React, { useState, useMemo } from 'react'

import PetInline from '@/app/account/components/characters/hench/pets/Inline'

import { Hench } from '@/types/hench'

interface GeneralProps {
  henches: Hench[]
  selectedHench?: Array<string>
  setSelectedHench?: (value: Array<string>) => void
}

export default function General({ henches, selectedHench = [], setSelectedHench = () => {} }: GeneralProps) {
  const types = ['dragon','beast','insect','metal','mystery','devil','bird','plant']

  const [selectedType, setSelectedType] = useState<string | undefined>('dragon')

  const filteredHenches = useMemo(() => {
    if (!Array.isArray(henches)) return []
    if (!selectedType) return henches
    return henches.filter(h => h.type === selectedType)
  }, [henches, selectedType])

  return (
    <div className="general text-base flex flex-col gap-12 w-full max-w-[1000px]">
      <div className="flex flex-wrap gap-12 items-center justify-center">
        {types.map(type => (
          <button
            key={type}
            type="button"
            onClick={() => setSelectedType(prev => prev === type ? undefined : type)}
            className={`
              relative group
              flex items-center justify-center
              w-[4.8rem] h-[4.8rem]
              ${selectedType === type ? 'cursor-default' : 'cursor-pointer'}
            `}
            title={type}
          >
            <img
              src={`/assets/images/hench/${type}.gif`}
              alt={type}
              className="z-1 relative max-w-full max-h-full object-contain"
              loading="lazy"
            />
            <span className={`
              block
              w-full h-[1.6rem] rounded-[100%]
              absolute top-[80%] left-[50%] translate-x-[-50%]
              transition-[.25s] bg-(--black) group-hover:bg-(--gray-0)
              ${selectedType === type ? 'bg-(--gray-0)' : ''}
            `}></span>
          </button>
        ))}
      </div>

      {Array.isArray(filteredHenches) && filteredHenches.length > 0 && (
        <div className="flex flex-col gap-[1px] w-full">
          {filteredHenches
            .slice()
            .sort((a, b) => {
              const activeDiff = Number(b.active) - Number(a.active)
              if (activeDiff !== 0) return activeDiff
              const levelDiff = a.base_level - b.base_level
              if (levelDiff !== 0) return levelDiff
              return a.name.localeCompare(b.name)
            })
            .map(h => (
              <PetInline
                key={h.id}
                hench={h}
                selectedHench={selectedHench}
                setSelectedHench={setSelectedHench}
              />
            ))}
        </div>
      )}

      {Array.isArray(filteredHenches) && filteredHenches.length === 0 && (
        <p className="text-base text-center">
          No hench found.
        </p>
      )}
    </div>
  )
}