"use client"
import React from 'react'

import { User, Hero } from '@/types/user'

interface CharactersProps {
  user: User
  setItems: (value: Hero | undefined) => void
  setPetsList: (value: Hero | undefined) => void
  handleSetCreate: (value: boolean) => void
}

export default function Characters({ user, setItems, setPetsList, handleSetCreate }: CharactersProps) {
  return (
    <section className="section-characters section overflow-hidden my-[0!important] py-20 sm:py-32 scroll-mt-20 sm:scroll-mt-32">
      <div className="container flex-col items-center z-1 relative">
        <h2 className="title">
          Characters 👥
        </h2>

        <p className={`text-base text-center mt-6`}>
          Check your account characters below.
        </p>
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