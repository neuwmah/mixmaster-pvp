import React from 'react'
import Image from 'next/image'

import { Pet } from '@/types/pet'
import { Hench } from '@/types/hench'

interface PetCardProps {
  pet?: Pet | false
  hench: Hench | undefined
  selectedHench?: Array<string> | false
  setSelectedHench?: (value: Array<string>) => void
}

export default function PetCard({ pet, hench, selectedHench = false, setSelectedHench }: PetCardProps) {
  const displayName = pet ? pet.nickname || hench?.name : hench?.name
  const active = !!(hench?.id && Array.isArray(selectedHench) && selectedHench.includes(hench.id))

  function toggleSelect() {
    if (!hench?.id || !setSelectedHench) return
    if (Array.isArray(selectedHench) && selectedHench.includes(hench.id)) {
      setSelectedHench(selectedHench.filter(id => id !== hench.id))
    } else {
      const current = Array.isArray(selectedHench) ? selectedHench : []
      setSelectedHench([...current, hench.id])
    }
  }
  
  function Row({ label, children }: { label: string; children: React.ReactNode }) {
    return (
      <div className="flex items-stretch">
        <span className="
          text-xs font-bold 
          flex items-center justify-center 
          w-[8rem] 
          rounded-l-[.8rem]
          bg-(--primary-orange-1)
        ">
          {label}
        </span>
        <span className={`
          text-xs text-(--gray-0) ${label == 'Type' && 'capitalize'}
          flex items-center 
          overflow-hidden
          bg-(--white) 
          rounded-r-[.8rem]
          flex-1 min-w-0 h-[3.2rem] px-[.8rem]
        `}>
          {children}
        </span>
      </div>
    )
  }

  return ((pet && pet.in_party) || !pet) && (
    <div
      className={`
        pet-card 
        flex flex-col
        relative overflow-hidden
        p-[2.4rem]
        bg-(--black)
        transition-[.25s]
        ${setSelectedHench && 'group border-dashed border-[1px]'}
        ${setSelectedHench && !active && 'cursor-pointer border-(--black) hover:border-(--gray-3)'}
        ${setSelectedHench && active && 'border-(--white)'}
      `}
      data-active={active ? 'true' : 'false'}
      onClick={toggleSelect}
    >
      <Image
        unoptimized
        width={40}
        height={40}
        src={`/assets/images/hench/icon/${hench?.code}.webp`}
        alt={displayName ?? ''}
        className={`
          background pointer-events-none
          object-cover 
          w-full h-full 
          opacity-20 blur-[.8rem] scale-150 
          absolute top-0 left-0 translate-y-[-1.6rem]
        `}
        loading="lazy"
      />

      <div className="type absolute top-[2.4rem] left-[2.4rem] flex w-[4rem] h-[4rem] z-1">
        <Image
          unoptimized
          width={48}
          height={48}
          src={`/assets/images/hench/${hench?.type}.gif`}
          alt={`background-${hench?.type}`}
          className="object-contain h-full w-auto"
          loading="lazy"
        />
      </div>
    
      <div className="sprite flex mx-auto flex-1 relative z-1">
        <Image
          unoptimized
          width={500}
          height={500}
          sizes="(max-width: 768px) 90vw, 500px"
          src={`/assets/images/hench/sprite/${hench?.code}.webp`}
          alt={displayName ?? ''}
          className="object-contain w-auto mt-auto"
          loading="lazy"
        />
      </div>

      <div className="infos flex justify-center items-center my-[1.6rem] relative z-1 h-[4rem]">
        <div className="
          image
          flex items-center justify-center
          overflow-hidden 
          w-[4rem] h-[4rem]
          absolute left-0 top-[50%] translate-y-[-50%]
        ">
          <Image
            unoptimized
            width={40}
            height={40}
            src={`/assets/images/hench/icon/${hench?.code}.webp`}
            alt={hench?.code}
              className="object-contain w-full h-full"
              loading="lazy"
          />
        </div>

        <div className="name flex flex-col items-center text-center">
          <h3 className="text-base font-bold" title={displayName}>
            {displayName}
          </h3>
          {hench?.name && hench?.name != displayName &&
            <span className="text-xs text-(--gray-3) font-normal">
              {hench.name}
            </span>
          }
        </div>
      </div>

      <div className="attributes flex flex-col gap-[1px] relative z-1">
        {hench?.name && hench?.name != displayName &&
          <Row label="Name">{displayName}</Row>
        }
        <Row label="Hench">{hench?.name ?? '—'}</Row>
        <Row label="Type">{hench?.type ?? '—'}</Row>
        <Row label="Level"><strong>{pet ? pet.level : hench?.base_level}</strong>/{hench?.base_level ? hench?.base_level + 25 : '—'}</Row>
      </div>
    </div>
  )
}