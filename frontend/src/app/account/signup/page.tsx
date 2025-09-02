import React from 'react';
import Link from 'next/link';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import Form from '@/app/account/signup/Form';

import BackgroundMix from '@/components/BackgroundMix';

export default async function SignUpPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sessionToken')?.value;

  if (token)
    return redirect('/account')

  return (
    <main className="flex flex-1 bg-gradient-to-b from-black to-(--gray-0) sm:items-center relative">
      <section className="section-signup section z-[2!important]">
        <div className="container flex-col items-center">

          <h1 className="title">
            Sign Up
          </h1>
          
          <p className="text-base mt-6">
            Already have an account? <Link className="link text-base duration-250 text-(--primary-orange-1) hover:underline" href="/account/signin">
              Click here
            </Link>
          </p>
          
          <Form />

        </div>
      </section>
      <BackgroundMix char1="penril" char2="ditt" />
    </main>
  )
}