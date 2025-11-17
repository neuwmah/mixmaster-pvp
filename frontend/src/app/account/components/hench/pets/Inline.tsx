import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { getIcon } from '@/app/account/components/hench/pets/image/index'

import { TrashIcon } from '@heroicons/react/24/outline'

import { Hench } from '@/types/hench'
import { Hero } from '@/types/user'

interface PetInlineProps {
  pet?: any
  hench: Hench | undefined
  character?: Hero
  maxSelection?: number
  selectedHench?: Array<string> | false
  setSelectedHench?: (value: Array<string>) => void
  setPetsList?: (value: Hero | undefined) => void
}

export default function PetInline({ pet, hench, character, maxSelection, selectedHench = false, setSelectedHench, setPetsList }: PetInlineProps) {
  const displayName = pet ? pet.nickname || hench?.name : hench?.name
  const active = !!(hench?.type && Array.isArray(selectedHench) && selectedHench.includes(hench.type))
  const current = Array.isArray(selectedHench) ? selectedHench : []
  const isMaxReached = maxSelection && current.length >= maxSelection && !active
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  function toggleSelect() {
    if (!hench?.type || !setSelectedHench) return
    if (Array.isArray(selectedHench) && selectedHench.includes(hench.type)) {
      setSelectedHench(selectedHench.filter(type => type !== hench.type))
    } else {
      const current = Array.isArray(selectedHench) ? selectedHench : []
      if (maxSelection && current.length >= maxSelection) return
      setSelectedHench([...current, hench.type])
    }
  }

  async function removePet(e: React.MouseEvent) {
    e.stopPropagation()
    if (!pet || !character) return

    setDeleting(true)

    alert('Pet deletion not yet implemented for MySQL')

    setDeleting(false)
    router.refresh()
  }

  return (
    <div
      className={`
        pet-inline
        flex items-center
        relative overflow-hidden
        min-h-[5rem]
        py-[.4rem] px-[2.4rem] gap-[2.4rem]
        bg-(--black)
        border-[1px] border-(--gray-1)
        duration-[.25s]
        ${((pet && pet.in_party)) && 'bg-(--gray-a)'}
        ${((pet && !pet.in_party) || !pet) && 'bg-(--gray-0) border-(--gray-1)'}
        ${setSelectedHench && 'group'}
        ${setSelectedHench && !active && !isMaxReached && 'cursor-pointer hover:border-(--gray-2)'}
        ${setSelectedHench && active && 'cursor-pointer !bg-(--gray-a)'}
        ${isMaxReached && 'opacity-50 cursor-not-allowed'}
      `}
      data-active={active ? 'true' : 'false'}
      onClick={toggleSelect}
    >
      <Image
        unoptimized
        width={40}
        height={40}
        src={getIcon(pet?.henchId ?? hench?.type ?? '')}
        alt={displayName ?? ''}
        className="object-contain w-[4rem] h-[4rem] rounded-full"
        loading="lazy"
      />

      <h3 className="text-sm font-semibold flex flex-col sm:block" title={hench?.name}>
        <span className={setSelectedHench && active ? 'underline' : ''}>
          {pet && pet.nickname ? pet.nickname : hench?.name}
        </span>
        <span className="text-xs font-normal sm:ml-[1.6rem]">
          Level {pet ? pet.level : hench?.start_base_level}
        </span>
      </h3>

      {pet &&
        <Image
          unoptimized
          width={32}
          height={32}
          src={`/assets/images/hench/${hench?.race || hench?.race == 0 ? hench?.race : hench?.type}.gif`}
          alt={`icon-${hench?.type}`}
          className="object-contain h-[3.2rem] w-[3.2rem] hidden sm:block"
          loading="lazy"
        />
      }

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