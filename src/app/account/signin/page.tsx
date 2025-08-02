import React from 'react';
import Link from 'next/link';

import Form from './Form';

export default async function SignInPage() {
  return (
    <main>
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