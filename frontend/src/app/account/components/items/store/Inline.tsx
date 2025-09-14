import React, { useEffect } from 'react'
import Image from 'next/image'

import { TrashIcon } from '@heroicons/react/24/outline'

import { Item } from '@/types/item'
import { Character } from '@/types/character'

interface ItemInlineProps {
  item: Item
  maxSelection?: number
  setItems: (value: Character | undefined) => void
}

export default function ItemInline({ item, maxSelection, setItems }: ItemInlineProps) {
  return (
    <div className="item-inline w-full flex">
      <span className="mr-4">
        Lv. {item.require_level}
      </span>
      {item.name}
    </div>
  )
}