import React, { useEffect } from 'react'
import Image from 'next/image'

import { TrashIcon } from '@heroicons/react/24/outline'

import { ItemInventory } from '@/types/item'
import { Character } from '@/types/character'

interface ItemInlineProps {
  item: ItemInventory
  character: Character
  maxSelection?: number
  setItems: (value: Character | undefined) => void
}

export default function ItemInline({ item, character, maxSelection, setItems }: ItemInlineProps) {
  return (
    <div>
      {/* <Image
        unoptimized
        width={40}
        height={40}
        src={`/assets/images/items/000${item.item_idx}.webp`}
        alt={item.s_item.name}
        className="object-contain w-[4rem] h-[4rem] rounded-full"
        loading="lazy"
      /> */}
      {item.s_item.name}
    </div>
  )
}