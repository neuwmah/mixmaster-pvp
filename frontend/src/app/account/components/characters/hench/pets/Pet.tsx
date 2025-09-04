import React from 'react'

import { Pet } from '@/types/pet'

interface PetProps {
  pet: Pet
}

export default function PetComponent({ pet }: PetProps) {
  const hench = pet.hench
  const displayName = pet.nickname || hench?.name || ''

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

  return pet.in_party && (
    <div key={pet.id} className="
      pet 
      flex flex-col
      relative overflow-hidden
      p-[2.4rem]
      bg-(--black)
      rounded-[.8rem]
      border-[1px] border-(--gray-1) border-dashed
    ">
      {hench?.icon_url && 
        <img
          src={`https://gamedata.joyplegames.com/mixmaster/data/img/spr/monster_top/000${hench.icon_url}.webp`}
          alt={hench.icon_url}
          className="
            background 
            object-cover 
            w-full h-full 
            opacity-20 blur-[.8rem] scale-150 
            absolute top-0 left-0 translate-y-[-1.6rem] 
          "
          loading="lazy"
        />
      }

      <div className="type absolute top-[2.4rem] left-[2.4rem] flex w-[4.8rem] h-[4.8rem] z-1">
        <img
          src={`/assets/images/hench/${hench?.type}.gif`}
          alt={`background-${hench?.type}`}
          className="object-contain h-full w-auto"
          loading="lazy"
        />
      </div>
    
      {hench?.sprite_url && 
        <div className="sprite flex mx-auto h-[20rem] relative z-1">
          <img
            src={`https://gamedata.joyplegames.com/mixmaster/data/img/spr/monster/mh${hench.sprite_url}.webp`}
            alt={hench.sprite_url}
            className="object-contain w-auto mt-auto"
            loading="lazy"
          />
        </div>
      }

      <div className="infos flex justify-center items-center my-[1.6rem] relative z-1 h-[4rem]">
        <div className="
          image
          flex items-center justify-center
          overflow-hidden 
          w-[4rem] h-[4rem]
          absolute left-0 top-[50%] translate-y-[-50%]
        ">
          {hench?.icon_url && 
            <img
              src={`https://gamedata.joyplegames.com/mixmaster/data/img/spr/monster_top/000${hench.icon_url}.webp`}
              alt={hench.icon_url}
              className="object-contain w-full h-full"
              loading="lazy"
            />
          }
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
        <Row label="Level"><strong>{pet.level}</strong>/{hench?.base_level ? hench?.base_level + 25 : '—'}</Row>
      </div>
    </div>
  )
}