import React from 'react';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <section className="section-signup section">
      <div className="container flex-col items-center">

        <h1 className="title">
          Sign In
        </h1>

        <p className="text-base mt-6">
          New account? <Link className="link text-base duration-250 text-(--primary-orange-1) hover:underline" href="/account/signup">Click here</Link>
        </p>

        <form className="form flex flex-col items-center w-full mt-12 max-w-[480px]">
          <div className="fields w-full grid gap-[1px] grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(2,1fr)]">
            <input className="bg-white text-xs text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]" id="username" name="username" type="text" placeholder="Username" required />
            <input className="bg-white text-xs text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]" id="password" name="password" type="text" placeholder="Password" required />
          </div>

          <button className="button-orange mt-12" type="button" aria-label="Click to Sign Up">
            Click to Sign In
          </button>
        </form>

      </div>
    </section>
  );
}