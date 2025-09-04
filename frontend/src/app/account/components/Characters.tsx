"use client"
import React, { useEffect, useState, useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'

import Manage from '@/app/account/components/characters/Manage'
import Create from '@/app/account/components/characters/Create'
import Hench from '@/app/account/components/characters/Hench'
import Background from '@/app/account/components/characters/create/Background'
import PendingTransfers from '@/app/account/components/characters/PendingTransfers'

import { User } from '@/types/user'
import { Character } from '@/types/character'

interface CharactersProps {
  user: User;
}

export default function Characters({ user }: CharactersProps) {
  const [create, setCreate] = useState(false)
  const [characterHench, setCharacterHench] = useState<Character | false>(false)
  const backgroundRef = useRef<SwiperType | null>(null)
  const userActionRef = useRef(false)
  const initialRenderRef = useRef(true)

  const handleSetCreate = (value: boolean) => {
    userActionRef.current = true
    setCreate(value)
  }

  useEffect(() => {
    setCreate(false)
  }, [])

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false
      userActionRef.current = false
      return
    }
    if (!userActionRef.current) return
    userActionRef.current = false
  }, [create])

  return (
    <section key={user.id} className="section-characters section overflow-hidden my-[0!important] py-20 sm:py-32 scroll-mt-20 sm:scroll-mt-32">
      {(!user.characters?.length || create) &&
        <Background backgroundRef={backgroundRef} />
      }

      <div className="container flex-col items-center z-1 relative">

        <h2 className="title">
          Characters 👥
        </h2>

        <p className={`text-base mt-6 text-center ${!user.characters?.length && 'max-w-[24rem] sm:max-w-[100%]'}`}>
          {user.characters?.length
            ? `Check your account characters below.`
            : `No characters yet. You can create a new one below.`
          }
        </p>

        <PendingTransfers userId={user.id} />

        {!user.characters?.length || create
          ? <Create user={user} create={create} setCreate={handleSetCreate} setCharacterHench={setCharacterHench} backgroundRef={backgroundRef} />
          : characterHench
            ? <Hench character={characterHench} setCharacterHench={setCharacterHench} />
            : <Manage characters={user.characters} setCreate={handleSetCreate} setCharacterHench={setCharacterHench} />
        }

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