import React from 'react'

import ItemInline from '@/app/account/components/items/store/Inline'

import { Character } from '@/types/character'
import { Item } from '@/types/item'

interface BagProps {
  items: Item[]
  maxSelection?: number
  selectedItems?: Array<string>
  setItems: (value: Character | undefined) => void
  setSelectedItems?: (value: Array<string>) => void
}

export default function Bag({ items, maxSelection, selectedItems, setItems, setSelectedItems }: BagProps) {
  return (
    <div className="
      store
      text-base
      flex flex-col gap-[1.6rem]
      w-full max-w-[1000px]
    ">  
      {!items?.length && (
        <p className="text-center">
          No items found.
        </p>
      )}

      {items?.length ? (
        <div className="flex flex-col gap-[8px] w-full">
          {items
            .slice()
            .sort((a, b) => {
              const getOrder = (type: string) => {
                const t = type.toLowerCase()
                if (t.includes('sword')) return 0
                if (t.includes('knuckle')) return 1
                if (t.includes('bow')) return 2
                if (t.includes('gun')) return 3
                return 4
              }
              return getOrder(a.name) - getOrder(b.name)
            })
            .map((item, i) => 
              <ItemInline 
                item={item} 
                key={`item${i}`} 
                setItems={setItems}
              />
            )}
        </div>
      ) : null}
    </div>
  )
}