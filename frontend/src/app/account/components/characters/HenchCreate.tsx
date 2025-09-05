"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { createPetsBulk } from '@/app/api/pets'

import General from '@/app/account/components/characters/hench/General'

import { Character } from '@/types/character'
import { Hench } from '@/types/hench'

interface HenchCreateProps {
  henches: Hench[]
  character: Character | undefined
  setHenchList: (value: Character | undefined) => void
  setPetsCreateDisplay: (value: boolean) => void
}

export default function HenchCreate({ henches, character, setHenchList, setPetsCreateDisplay }: HenchCreateProps) {
  const [selectedHench, setSelectedHench] = useState<string[]>([])
  const [sending, setSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault()
    setSending(true)
    setErrorMessage('')

    try {
      const result = await createPetsBulk(selectedHench.map(
        (hid, idx) => ({ 
          characterId: character ? character.id : '',
          henchId: hid
        })
      ))

      if (character && result.data)
        setHenchList({ ...character, pets: [...character.pets || [], ...result.data] })
      setPetsCreateDisplay(false)
      
      router.refresh()
    } catch {
      alert('Unexpected error.')
      setTimeout(() => setErrorMessage(''), 2500)
    }

    setSending(false);
  }

  return (
    <div className="hench-create mt-12 w-full flex flex-col items-center">
      <General henches={henches} selectedHench={selectedHench} setSelectedHench={setSelectedHench} />

      <div className="mt-16 flex items-center gap-4">
        <button
          className="w-auto button-gray"
          type="button"
          aria-label="Close Pets"
          onClick={() => setPetsCreateDisplay(false)}
        >
          Return
        </button>
        <button
          className="w-auto button-orange"
          type="button"
          aria-label="Add New Pet"
          onClick={handleCreate}
          disabled={!(selectedHench && selectedHench.length)}
        >
          Create 🐍
        </button>
      </div>
    </div>
  )
}