import React from 'react';
import Link from 'next/link';

import Form from './Form';

export default async function SignUpPage() {
  return (
    <main>
      <section className="section-signup section">
        <div className="container flex-col items-center">

          <h1 className="title">
            Sign Up
          </h1>
          
          <p className="text-base mt-6">
            Already have an account? <Link className="link text-base duration-250 text-(--primary-orange-1) hover:underline" href="/account/signin">Click here</Link>
          </p>
          
          <Form />

        </div>
      </section>
    </main>
  )
}