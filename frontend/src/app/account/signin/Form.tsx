"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { loginUser } from '@/app/api/account';

import { CheckIcon } from '@heroicons/react/24/outline';

export default function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSignin = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);

    try {
      const response = await loginUser(username, password) as Response;
      if (!('ok' in response) || !response.ok) {
        console.log('handleSignin response error', response);
        setErrorMessage('User not found.');
        setTimeout(() => {
          setErrorMessage('');
          setSending(false);
        }, 3000);
      } else {
        await new Promise(r => setTimeout(r, 120));
        router.replace('/account');
        router.refresh();
      }
    } catch (error) {
      console.error('handleSignin token error', error);
    }
  };

  return (
    <form onSubmit={handleSignin} className={`form flex flex-col items-center w-full mt-12 max-w-[320px]`}>
      <div className="fields w-full grid grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(1,1fr)]">
        <input
          className={`bg-white text-sm text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem] border-b-1 border-(--gray-0) duration-[.25s] ${sending && 'pointer-events-none opacity-[.7]'}`}
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className={`bg-white text-sm text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem] border-b-1 border-(--gray-0) duration-[.25s] ${sending && 'pointer-events-none opacity-[.7]'}`}
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className={`button-orange mt-12 ${sending && 'pointer-events-none'}`} type="submit" aria-label="Click to Login">
        Confirm
      </button>

      {errorMessage && (
        <p className="text-sm text-white mt-12">
          {errorMessage}
        </p>
      )}
    </form>
  )
}