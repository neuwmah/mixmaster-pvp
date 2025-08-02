"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createUser, loginUser } from '@/app/api/user';

export default function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);

    try {
      await createUser({ username, password, email });

      try {
        const response = await loginUser(username, password) as Response;
  
        if (response.ok) {
          router.push('/account');
          router.refresh();
        } else {
          console.log('handleCreate response error', response);
        }
      } catch (error) {
        console.error('handleCreate token error', error);
      }
    } catch (error) {
      console.error('handleCreate API error', error);
    }

    setSending(false);
  };

  return (
    <form onSubmit={handleCreate} className={`form flex flex-col items-center w-full mt-12 max-w-[320px] duration-[.25s] ${sending && 'pointer-events-none opacity-[.7]'}`}>
      <div className="fields w-full grid gap-[1px] grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(1,1fr)]">
        <input
          className="bg-white text-xs text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]"
          id="username"
          name="username"
          type="text"
          placeholder="Username*"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="bg-white text-xs text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]"
          id="password"
          name="password"
          type="password"
          placeholder="Password*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="bg-white text-xs text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]"
          id="email"
          name="email"
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="bg-white text-xs text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]"
          id="phone"
          name="phone"
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <button className="button-orange mt-12" type="submit" aria-label="Click to Sign Up">
        Call to Action
      </button>
    </form>
  )
}