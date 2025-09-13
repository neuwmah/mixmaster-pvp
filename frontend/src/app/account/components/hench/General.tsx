'use client'
import React, { useState, useMemo } from 'react'
import Image from 'next/image'

import PetInline from '@/app/account/components/hench/pets/Inline'

import { Hench } from '@/types/hench'

interface GeneralProps {
  henches: Hench[]
  maxSelection?: number
  selectedHench?: Array<string>
  setSelectedHench?: (value: Array<string>) => void
}

export default function General({ henches, maxSelection, selectedHench = [], setSelectedHench = () => {} }: GeneralProps) {
  const types = [0,1,2,3,4,5,6,7]

  const [selectedType, setSelectedType] = useState<number>(0)

  const filteredHenches = useMemo(() => {
    if (!Array.isArray(henches)) return []
    if (!selectedType && selectedType != 0) return henches
    return henches.filter(h => h.race === selectedType)
  }, [henches, selectedType])

  return (
    <div className="general text-base flex flex-col gap-12 w-full max-w-[1000px]">
      <div className="flex flex-wrap gap-12 items-center justify-center">
        {types.map(type => (
          <button
            key={`button${type}`}
            type="button"
            onClick={() => setSelectedType(type)}
            className={`
              relative group
              flex items-center justify-center
              w-[4.8rem] h-[4.8rem]
              ${selectedType === type ? 'cursor-default' : 'cursor-pointer'}
            `}
            title={`${type}`}
          >
            <Image
              unoptimized
              width={48}
              height={48}
              src={`/assets/images/hench/${type}.gif`}
              alt={type}
              className="z-1 relative max-w-full max-h-full object-contain"
              loading="lazy"
            />
            <span className={`
              block
              w-full h-[1.6rem] rounded-[100%]
              absolute top-[80%] left-[50%] translate-x-[-50%]
              transition-[.25s] bg-(--black)
              ${selectedType === type ? 'bg-(--gray-2)' : 'bg-(--gray-a) group-hover:bg-(--gray-1)'}
            `}></span>
          </button>
        ))}
      </div>

      {Array.isArray(filteredHenches) && filteredHenches.length > 0 && (
        <div className="flex flex-col gap-[1px] w-full max-h-[320px] overflow-auto">
          {filteredHenches
            .slice()
            .sort((a, b) => {
              if (a.start_base_level && b.start_base_level) {
                const levelDiff = b.start_base_level - a.start_base_level
                if (levelDiff !== 0) return levelDiff
              }
              return a.name.localeCompare(b.name)
            })
            .map(h => (
              <PetInline
                key={`${h.type}`}
                hench={h}
                selectedHench={selectedHench}
                setSelectedHench={setSelectedHench}
                maxSelection={maxSelection}
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