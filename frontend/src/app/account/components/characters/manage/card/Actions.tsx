import React from 'react';

import { Hero } from '@/types/user';

interface ActionsProps {
  hero: Hero
  setPetsList: (value: Hero | undefined) => void
  setItems: (value: Hero | undefined) => void
}

export default function Actions({
  hero,
  setPetsList,
  setItems
}: ActionsProps) {
  return (
    <div className="actions absolute pointer-events-none p-8 top-0 right-0 z-1 flex flex-col gap-8 h-full opacity-100 duration-[.25s]">
      <button
        className="text-[2rem] group relative pointer-events-auto cursor-pointer duration-[.25s] hover:text-(--primary-orange-1)"
        type="button"
        onClick={() => { setPetsList(hero) }}
      >
        <span className="text-sm text-white pointer-events-none absolute right-[calc(100%+.8rem)] top-[50%] translate-y-[-50%] opacity-0 duration-[.25s] group-hover:opacity-100">
          Pets
        </span>
        🐍
      </button>
      
      <button
        className="text-[2rem] group relative pointer-events-auto cursor-pointer duration-[.25s] hover:text-(--primary-orange-1)"
        type="button"
        onClick={() => { setItems(hero) }}
      >
        <span className="text-sm text-white pointer-events-none absolute right-[calc(100%+.8rem)] top-[50%] translate-y-[-50%] opacity-0 duration-[.25s] group-hover:opacity-100">
          Items
        </span>
        🛡️
      </button>
    </div>
  )
}