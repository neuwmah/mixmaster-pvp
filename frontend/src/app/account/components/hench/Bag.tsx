import React from 'react'

import PetInline from '@/app/account/components/hench/pets/Inline'

import { Hero } from '@/types/user'

interface BagProps {
  character: Hero
  setPetsList: (value: Hero | undefined) => void
}

export default function Bag({ character, setPetsList }: BagProps) {
  return (
    <div className="
      bag
      text-base
      flex flex-col gap-[1.6rem]
      w-full max-w-[1000px]
    ">  
      <p className="text-center">
        Pets system will be available soon.
      </p>
    </div>
  )
}