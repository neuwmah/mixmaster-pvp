"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createUser } from '@/app/api/user';

export default function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await createUser({
        created_at: new Date(),
        characters: [],
        username,
        password,
        email,
        online_status: false,
        online_time: 0,
        online_points: 0,
        last_connection_date: new Date(),
        last_connection_ip: ""
      });

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
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
  };

  return (
    <form onSubmit={handleCreate} className="form flex flex-col items-center w-full mt-12 max-w-[320px]">
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