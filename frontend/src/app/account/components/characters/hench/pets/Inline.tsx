import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { deletePet } from '@/app/api/pets'

import { TrashIcon } from '@heroicons/react/24/outline'

import { Pet } from '@/types/pet'
import { Hench } from '@/types/hench'
import { Character } from '@/types/character'

interface PetInlineProps {
  pet?: Pet | false
  hench: Hench | undefined
  character?: Character
  selectedHench?: Array<string> | false
  setSelectedHench?: (value: Array<string>) => void
  setCharacterHench?: (value: Character | false) => void
}

export default function PetInline({ pet, hench, character, selectedHench = false, setSelectedHench, setCharacterHench }: PetInlineProps) {
  const displayName = pet ? pet.nickname || hench?.name : hench?.name
  const active = !!(hench?.id && Array.isArray(selectedHench) && selectedHench.includes(hench.id))
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  function toggleSelect() {
    if (!hench?.id || !setSelectedHench) return
    if (Array.isArray(selectedHench) && selectedHench.includes(hench.id)) {
      setSelectedHench(selectedHench.filter(id => id !== hench.id))
    } else {
      const current = Array.isArray(selectedHench) ? selectedHench : []
      setSelectedHench([...current, hench.id])
    }
  }

  async function removePet(e: React.MouseEvent) {
    e.stopPropagation()
    if (!pet) return
    
    setDeleting(true)
    
    const { error } = await deletePet(pet.id)
    if (error) alert(error)
      
    if (!error && character && setCharacterHench)
      setCharacterHench({ ...character, pets: character.pets?.filter(p => p.id !== pet.id) })
    
    setDeleting(false)
    router.refresh()
  }

  return (
    <div 
      className={`
        pet-inline
        flex items-center
        relative overflow-hidden
        py-[.8rem] px-[2.4rem] gap-[2.4rem]
        bg-(--black)
        rounded-[.8rem]
        border-[1px] border-(--gray-1) border-dashed
        transition-[.25s] ${((pet && !pet.in_party) || !pet) && 'bg-(--gray-0) border-(--gray-3) hover:border-(--white)'}
        ${setSelectedHench && 'group'}
        ${setSelectedHench && !active && 'cursor-pointer'}
        ${setSelectedHench && active && 'border-(--white)'}
      `}
      data-active={active ? 'true' : 'false'}
      onClick={toggleSelect}
    >
      <img
        src={`https://gamedata.joyplegames.com/mixmaster/data/img/spr/monster_top/000${hench?.icon_url}.webp`}
        alt={displayName}
        className="object-contain w-[4rem] h-[4rem]"
        loading="lazy"
      />

      <h3 className="text-base font-bold" title={hench?.name}>
        {hench?.name}
        <span className="text-xs font-normal ml-[.8rem]">
          Level {pet ? pet.level : hench?.base_level}
        </span>
      </h3>

      <img
        src={`/assets/images/hench/${hench?.type}.gif`}
        alt={`icon-${hench?.type}`}
        className="object-contain h-[3.2rem] w-[3.2rem]"
        loading="lazy"
      />

      {pet && !pet.in_party &&
        <button
          className="
            group relative ml-auto
            pointer-events-auto cursor-pointer 
            duration-[.25s] hover:text-(--primary-orange-1)
            disabled:opacity-40 disabled:cursor-not-allowed
          "
          type="button"
          onClick={removePet}
          disabled={deleting}
        >
          <span className="text-sm text-white pointer-events-none absolute right-[calc(100%+.8rem)] top-[50%] translate-y-[-50%] opacity-0 duration-[.25s] group-hover:opacity-100">
            Remove
          </span>
          <TrashIcon className="icon" />
        </button>
      }
    </div>
  )
}