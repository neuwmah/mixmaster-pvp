"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

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
  };

  return (
    <form onSubmit={handleLogin} className="form flex flex-col items-center w-full mt-12 max-w-[320px]">
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

      <button className="button-orange mt-12" type="submit" aria-label="Click to Sign In">
        Call to Action
      </button>
    </form>
  )
}