import React from 'react'

import { TrashIcon } from '@heroicons/react/24/outline'

import { Pet } from '@/types/pet'

interface PetInlineProps {
  pet: Pet
}

export default function PetInline({ pet }: PetInlineProps) {
  const hench = pet.hench
  const displayName = pet.nickname || hench?.name || ''

  return (
    <div key={pet.id} className={`
      pet-inline
      flex items-center
      relative overflow-hidden
      py-[.8rem] px-[2.4rem] gap-[2.4rem]
      bg-(--black)
      rounded-[.8rem]
      border-[1px] border-(--gray-1) border-dashed
      transition-[.25s] ${!pet.in_party && 'bg-(--gray-0) border-(--gray-3) hover:border-(--white)'}
    `}>
      <img
        src={`https://gamedata.joyplegames.com/mixmaster/data/img/spr/monster_top/000${hench?.icon_url}.webp`}
        alt={displayName}
        className="object-contain w-[4rem] h-[4rem]"
        loading="lazy"
      />

      <h3 className="text-base font-bold" title={hench?.name}>
        {hench?.name}
        <span className="text-xs font-normal ml-[.8rem]">
          Level {pet.level}
        </span>
      </h3>

      <img
        src={`/assets/images/hench/${hench?.type}.gif`}
        alt={`icon-${hench?.type}`}
        className="object-contain h-[3.2rem] w-[3.2rem]"
        loading="lazy"
      />

      {!pet.in_party &&
        <button
          className="group relative pointer-events-auto cursor-pointer duration-[.25s] hover:text-(--primary-orange-1) disabled:opacity-40 disabled:cursor-not-allowed"
          type="button"
          // onClick={removePet}
          // disabled={deleting}
        >
          <span className="text-sm text-white pointer-events-none absolute right-[calc(100%+.8rem)] top-[50%] translate-y-[-50%] opacity-0 duration-[.25s] group-hover:opacity-100">
            Remove
          </span>
          {/* {deleting ? '...' : <TrashIcon className="icon" />} */}
        </button>
      }
    </div>
  )
}