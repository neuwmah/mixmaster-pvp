"use client"
import React, { useEffect, useState, useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper'

import Manage from '@/app/account/components/characters/Manage';
import Create from '@/app/account/components/characters/Create';
import CreateBackground from '@/app/account/components/characters/CreateBackground';

import { User } from '@/types/user';

interface CharactersProps {
  user: User;
}

export default function Characters({ user }: CharactersProps) {
  const [create, setCreate] = useState(false);
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
    const section = document.querySelector('.section-characters')
    if (section)
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
  }, [create])

  return (
    <section key={user.id} className="section-characters section overflow-hidden my-[0!important] py-20 sm:py-32 scroll-mt-20 sm:scroll-mt-32">
      {(!user.characters?.length || create) &&
        <CreateBackground backgroundRef={backgroundRef} />
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

        {!user.characters?.length || create
          ? <Create user={user} create={create} setCreate={handleSetCreate} backgroundRef={backgroundRef} />
          : <Manage characters={user.characters} setCreate={handleSetCreate} />
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