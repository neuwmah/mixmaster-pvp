import React from 'react';

import LogoutButton from '@/app/account/components/details/LogoutButton';
import ChangeableField from './details/ChangeableField';
import BackgroundMix from '@/components/BackgroundMix';

import { User } from '@/types/user';

interface DetailsProps {
  user: User;
}

export default function Details({ user }: DetailsProps) {
  const cardsClass = `
    info 
    min-w-0 p-8 gap-2 flex flex-col
    text-ellipsis relative overflow-hidden
    border-[1px] border-(--gray-0) bg-(--black)
  `
  
  const changeableData = [
    { key: 'e-mail', data: user.Email ?? null },
    { key: 'password', data: null }
  ]

  return (
    <section className="
      section-details section section-p
      mt-[0!important] py-[40px] sm:py-[64px]
      bg-gradient-to-b from-black bg-(--gray-0)
    ">
      <div className="container flex-col items-center relative z-2">

        <h1 className="title">
          Account 👤
        </h1>

        <p className="text-base text-center mt-6">
          Check your account details below.
        </p>

        <div className="text-sm grid mt-12 w-full max-w-[1000px] gap-4 grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(3,1fr)] items-start">
          <div className={cardsClass}>
            <p>ID</p>
            <strong>{user.id_idx}</strong>
          </div>
          <div className={cardsClass}>
            <p>USERNAME</p>
            <strong>{user.PlayerID}</strong>
          </div>
          <div className={cardsClass}>
            <p>NAME</p>
            <strong>{user.Name}</strong>
          </div>

          {changeableData.map((field: { key: string; data: string | null }) => {
            return <ChangeableField
              userId={user.id_idx.toString()}
              username={user.PlayerID}
              key={field.key}
              field={field}
              cardsClass={cardsClass}
            />
          })}
        </div>

        <LogoutButton />

      </div>
      <BackgroundMix char1="phoy" char2="jin" />
    </section>
  )
}