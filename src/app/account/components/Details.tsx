import React from 'react';

import { User } from '../type';

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
            <p>ACCOUNT ID</p>
            <strong>{user.id}</strong>
          </div>
          <div className={cardsClass}>
            <p>LOGIN</p>
            <strong>{user.username}</strong>
          </div>
          <div className={cardsClass}>
            <p>E-MAIL</p>
            <strong>{user.email}</strong>
          </div>
          <div className={cardsClass}>
            <p>STATUS</p>
            <strong className={`${user.status == 'online' ? 'text-[#00ce00]' : 'text-[#ff4f4f]'}`}>
              {user.status}
            </strong>
          </div>
          <div className={cardsClass}>
            <p>CHARACTERS</p>
            <strong>{user.characters.length}</strong>
          </div>
          <div className={cardsClass}>
            <p>ONLINE POINTS</p>
            <strong>{user.shop.online_points}</strong>
          </div>
        </div>

      </div>
    </section>
  );
};