import React from 'react'

import ItemInline from '@/app/account/components/items/bag/Inline'

import { Character } from '@/types/character'

interface BagProps {
  character: Character
  setItems: (value: Character | undefined) => void
}

export default function Bag({ character, setItems }: BagProps) {
  return (
    <div className="
      bag
      text-base
      flex flex-col gap-[1.6rem]
      w-full max-w-[1000px]
    ">  
      {!character.items?.length && (
        <p className="text-center">
          No items found.
        </p>
      )}

      {character.items?.length ? (
        <div className="flex flex-col gap-[1px] w-full">
          {character.items
            .slice()
            .sort((a, b) => {
              const nameA = (a.s_item.name || '').toLowerCase()
              const nameB = (b.s_item.name || '').toLowerCase()
              if (nameA < nameB) return -1
              if (nameA > nameB) return 1
              return 0
            })
            .map((item, i) => <ItemInline item={item} key={`item${i}`} character={character} setItems={setItems} />)}
        </div>
      ) : null}
    </div>
  )
}