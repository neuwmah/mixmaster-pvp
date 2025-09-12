import React from 'react'

import { getHenchs } from '@/app/api/hench'

import Party from '@/app/account/components/hench/Party'
import Bag from '@/app/account/components/hench/Bag'

import { Character } from '@/types/character'
import { Hench } from '@/types/hench'

interface HenchManageProps {
  character: Character
  henches: Hench[]
  setPetsList: (value: Character | undefined) => void
  setHenchList: (value: Hench[]) => void
  setHenchListDisplay: (value: boolean) => void
}

export default function HenchManage({ character, henches, setPetsList, setHenchList, setHenchListDisplay }: HenchManageProps) {
  return (
    <section className="
      section-hench-manage section
      my-[0!important]
      overflow-hidden
      py-20 sm:py-32
      scroll-mt-20 sm:scroll-mt-32
      sm:min-h-[calc(100vh-8.8rem-3.2rem-4.2rem)]
      sm:flex sm:items-center
    ">
      <div className="container flex-col items-center z-1 relative">
        <h2 className="title">
          Henchs 🐍
        </h2>

        <p className={`text-big text-center mt-6`}>
          Check your character pets below.
        </p>

        <div className="hench-manage mt-12 w-full flex flex-col items-center">
          <Party character={character} />
          <Bag character={character} setPetsList={setPetsList} />

          <div className="mt-16 flex items-center gap-4">
            <button
              className="w-auto button-gray"
              type="button"
              aria-label="Close Pets"
              onClick={() => setPetsList(undefined)}
            >
              Save
            </button>
            {(character.pets && character.pets.length < 20) ?
              <button
                className="w-auto button-orange"
                type="button"
                aria-label="Add New Pet"
                onClick={async () => {
                  if (henches.length == 0) {
                    const currentHenches = await getHenchs()
                    setHenchList(currentHenches)
                  }
                  setHenchListDisplay(true)
                }}
              >
                New Pet 🐍
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