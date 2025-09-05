import React from 'react'

import { getHenchs } from '@/app/api/hench'

import Party from '@/app/account/components/characters/hench/Party'
import Bag from '@/app/account/components/characters/hench/Bag'

import { Character } from '@/types/character'
import { Hench } from '@/types/hench'

interface HenchManageProps {
  character: Character
  henches: Hench[]
  setHenchList: (value: Character | undefined) => void
  setPetsCreate: (value: Hench[]) => void
  setPetsCreateDisplay: (value: boolean) => void
}

export default function HenchManage({ character, henches, setHenchList, setPetsCreate, setPetsCreateDisplay }: HenchManageProps) {
  return (
    <div className="hench-manage mt-12 w-full flex flex-col items-center">
      <Party character={character} />
      <Bag character={character} setHenchList={setHenchList} />

      <div className="mt-16 flex items-center gap-4">
        <button
          className="w-auto button-gray"
          type="button"
          aria-label="Close Pets"
          onClick={() => setHenchList(undefined)}
        >
          Save
        </button>
        <button
          className="w-auto button-orange"
          type="button"
          aria-label="Add New Pet"
          onClick={async () => {
            if (henches.length == 0) {
              const currentHenches = await getHenchs()
              setPetsCreate(currentHenches)
            }
            setPetsCreateDisplay(true)
          }}
        >
          New Pet 🐍
        </button>
      </div>
    </div>
  )
}