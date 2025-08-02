"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { loginUser } from '@/app/api/user';

export default function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, [errorMessage]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);

    try {
      const response = await loginUser(username, password) as Response;

      if (response.ok) {
        router.push('/account');
        router.refresh();
      } else {
        console.log('handleLogin response error', response);
        setErrorMessage('User not found.');
      }
    } catch (error) {
      console.error('handleLogin token error', error);
    }

    setSending(false);
  };

  return (
    <form onSubmit={handleLogin} className={`form flex flex-col items-center w-full mt-12 max-w-[320px] duration-[.25s] ${sending && 'pointer-events-none opacity-[.7]'}`}>
      <div className="fields w-full grid gap-[1px] grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(1,1fr)]">
        <input
          className="bg-white text-xs text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]"
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="bg-white text-xs text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className={`button-orange mt-12 ${sending && 'pointer-events-none'}`} type="submit" aria-label="Click to Sign In">
        Call to Action
      </button>

      {errorMessage && (
        <p className="text-base text-white mt-12">
          {errorMessage}
        </p>
      )}
    </form>
  )
}