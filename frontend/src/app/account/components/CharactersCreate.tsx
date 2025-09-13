"use client"
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Swiper as SwiperType } from 'swiper'

import { createCharacter } from '@/app/api/character'
import { getHenchs } from '@/app/api/hench'

import Background from '@/app/account/components/characters/Background'
import Fields from '@/app/account/components/charactersCreate/Fields'
import Jobs from '@/app/account/components/charactersCreate/Jobs'

import { User } from '@/types/user'
import { Hench } from '@/types/hench'

interface CharactersCreateProps {
  user: User
  create: boolean
  setCreate: (value: boolean) => void
  setHenchList: (value: Hench[]) => void
  setHenchListDisplay: (value: boolean) => void
}

export default function CharactersCreate({ user, create, setCreate, setHenchList, setHenchListDisplay }: CharactersCreateProps) {
  const [name, setName] = useState('')
  const [job, setJob] = useState('ditt')
  const [attributes, setAttributes] = useState({ energy: 10, agility: 10, accuracy: 10, luck: 10 })
  const [sending, setSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const backgroundRef = useRef<SwiperType | null>(null)

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault()
    setSending(true)
    setErrorMessage('')

    try {
      const partialCharacter = {
        userId: user.id,
        name,
        class: job,
        energy: attributes.energy,
        agility: attributes.agility,
        accuracy: attributes.accuracy,
        luck: attributes.luck
      }

      const result = await createCharacter(partialCharacter)
      if (result.error || !result.data) {
        alert(result.error || 'Create error.')
        setTimeout(() => setErrorMessage(''), 2500)
      } else {
        const currentHenches = await getHenchs()
        setCreate(false)
        setHenchList(currentHenches)
        setHenchListDisplay(true)
        router.refresh()
      }
    } catch {
      alert('Unexpected error.')
      setTimeout(() => setErrorMessage(''), 2500)
    }

    setSending(false)
  }

  return (
    <section className="
      section-characters-create section 
      my-[0!important]
      overflow-hidden
      py-20 sm:py-32
      scroll-mt-20 sm:scroll-mt-32
      sm:min-h-[calc(100vh-8.8rem-3.2rem-4.2rem)]
      sm:flex sm:items-center
    ">
      {(!user.characters?.length || create) &&
        <Background backgroundRef={backgroundRef} />
      }

      <div className="container flex-col items-center z-1 relative">
        <h2 className="title">
          Characters 👥
        </h2>

        <p className={`text-big text-center mt-6 max-w-[24rem] sm:max-w-[100%]`}>
          Create a new character below.
        </p>
        
        <form
          onSubmit={handleCreate}
          className={`
            form flex flex-col items-center w-full mt-12 max-w-[800px] duration-[.25s]
            ${sending && 'pointer-events-none opacity-[.7]'}
          `}
        >
          
          <div className="wrapper w-full flex flex-col gap-12 sm:grid sm:grid-cols-2 sm:items-start">
            <Fields sending={sending} name={name} setName={setName} attributes={attributes} setAttributes={setAttributes} />
            <Jobs sending={sending} job={job} setJob={setJob} backgroundRef={backgroundRef} />
          </div>
          
          <div className="mt-16 flex items-center gap-4">
            {create &&
              <button
                className={`w-auto button-gray ${sending && 'pointer-events-none'}`}
                aria-label="Click to Return"
                type="button"
                onClick={() => setCreate(false)}
              >
                Return
              </button>      
            }
            <button
              className={`w-auto button-orange ${sending && 'pointer-events-none'}`}
              aria-label="Click to Create"
              type="submit"
            >
              Create ✨
            </button>
          </div>

          {errorMessage && (
            <p className="text-base text-white mt-12">
              {errorMessage}
            </p>
          )}

        </form>
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