import React from 'react';
import Link from 'next/link';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import Form from './Form';

export default async function SignInPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sessionToken')?.value;
  
  if (token)
    return redirect('/account')

  return (
    <main className="flex flex-1 bg-gradient-to-b from-black to-(--gray-0) sm:items-center">
      <section className="section-signup section">
        <div className="container flex-col items-center">

          <h1 className="title">
            Sign In
          </h1>

          <p className="text-base mt-6">
            New account? <Link className="link text-base duration-250 text-(--primary-orange-1) hover:underline" href="/account/signup">Click here</Link>
          </p>

          <Form />

        </div>
      </section>
    </main>
  );
}