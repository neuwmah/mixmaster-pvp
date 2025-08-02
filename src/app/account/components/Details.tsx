import React from 'react';

import LogoutButton from './LogoutButton';

import { User } from '@/types/user';

interface DetailsProps {
  user: User;
}

export default function Details({ user }: DetailsProps) {
  const cardsClass = 'info text-ellipsis overflow-hidden min-w-0 p-8 bg-(--gray-0)';
  
  return (
    <section className="section-details section">
      <div className="container flex-col items-center">

        <h1 className="title">
          Account
        </h1>

        <p className="text-base mt-6">
          Check your account details below.
        </p>

        <div className="text-sm grid mt-12 w-full max-w-[1000px] gap-4 grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(3,1fr)]">
          <div className={cardsClass}>
            <p>ID</p>
            <strong>{user.id}</strong>
          </div>
          <div className={cardsClass}>
            <p>USERNAME</p>
            <strong>{user.username}</strong>
          </div>
          <div className={cardsClass}>
            <p>E-MAIL</p>
            <strong>{user.email}</strong>
          </div>
          <div className={cardsClass}>
            <p>STATUS</p>
            <strong className={`${user.online_status ? 'text-[#00ce00]' : 'text-[#ff4f4f]'}`}>
              {`${user.online_status ? 'online' : 'offline'}`}
            </strong>
          </div>
          <div className={cardsClass}>
            <p>CHARACTERS</p>
            <strong>{user.characters.length}</strong>
          </div>
          <div className={cardsClass}>
            <p>ONLINE TIME</p>
            <strong>{user.online_time}</strong>
          </div>
        </div>

        <LogoutButton />

      </div>
    </section>
  );
};