"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createUser, getUserByUsername } from '@/app/api/user';
import { loginUser } from '@/app/api/account';

export default function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);

    try {
      const existing = await getUserByUsername(username);
      if (existing) {
        setErrorMessage('Username unavailable.');
        setTimeout(() => setErrorMessage(''), 3000);
        setSending(false);
        return;
      }
      const created = await createUser({ username, password, email, phone });
      if (!created) {
        setErrorMessage('Create failed');
        setTimeout(() => setErrorMessage(''), 3000);
        setSending(false);
        return;
      }
      const response = await loginUser(username, password) as Response;
      if (!('ok' in response) || !response.ok) {
        setErrorMessage('Auto-login failed');
        setTimeout(() => setErrorMessage(''), 3000);
      } else {
        await new Promise(r => setTimeout(r, 120));
        router.replace('/account');
        router.refresh();
      }
    } catch (error) {
      console.log('handleSignup API getUserByUsername error', error)
    }

    setSending(false);
  };

  return (
    <form onSubmit={handleSignup} className={`form flex flex-col items-center w-full mt-12 max-w-[320px] duration-[.25s] ${sending && 'pointer-events-none opacity-[.7]'}`}>
      <div className="fields w-full grid gap-[1px] grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(1,1fr)]">
        <input
          className="bg-white text-sm text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]"
          id="username"
          name="username"
          type="text"
          placeholder="Username*"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="bg-white text-sm text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]"
          id="password"
          name="password"
          type="password"
          placeholder="Password*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="bg-white text-sm text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]"
          id="email"
          name="email"
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="bg-white text-sm text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]"
          id="phone"
          name="phone"
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <button className="button-orange mt-12" type="submit" aria-label="Click to Sign Up">
        Register
      </button>

      {errorMessage && (
        <p className="text-base text-white mt-12">
          {errorMessage}
        </p>
      )}
    </form>
  )
}