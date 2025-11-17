import React from 'react'

import { getItems } from '@/app/api/item'

import Bag from '@/app/account/components/items/Bag'

import { Hero } from '@/types/user'
import { Item } from '@/types/item'

interface ItemsManageProps {
  character: Hero
  setItems: (value: Hero | undefined) => void
  setItemsList: (value: Item[]) => void
}

export default function ItemsManage({ character, setItems, setItemsList }: ItemsManageProps) {
  return (
    <section className="
      section-items-manage section
      my-[0!important]
      overflow-hidden
      py-20 sm:py-32
      scroll-mt-20 sm:scroll-mt-32
      sm:min-h-[calc(100vh-8.8rem-3.2rem-4.2rem)]
      sm:flex sm:items-center
    ">
      <div className="container flex-col items-center z-1 relative">
        <h2 className="title">
          Items 🛡️
        </h2>

        <p className={`text-base text-center mt-6`}>
          Check your character items below.
        </p>

        <div className="items-manage mt-12 w-full flex flex-col items-center">
          <Bag character={character} setItems={setItems} />

          <div className="mt-16 flex items-center gap-4">
            <button
              className="w-auto button-gray"
              type="button"
              aria-label="Close Items"
              onClick={() => setItems(undefined)}
            >
              Save
            </button>
            {true ?
              <button
                className="w-auto button-orange"
                type="button"
                aria-label="Add New Item"
                onClick={async () => {
                  const currentItems = await getItems(character.class.toString())
                  setItemsList(currentItems)
                }}
              >
                New Item 🛡️
              </button>
            : null}
          </div>
        </div>
      </div>

      <svg className="absolute top-0 left-0 w-full pointer-events-none z-1 rotate-[180deg]" viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg">
        <path className="fill-(--gray-1)" d="M0,0L1440,40L1440,40L0,40Z"></path>
      </svg>

      <svg className="absolute bottom-0 left-0 w-full pointer-events-none z-1" viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg">
        <path className="fill-(--gray-1)" d="M0,0L1440,40L1440,40L0,40Z"></path>
      </svg>
    </section>
  )
}