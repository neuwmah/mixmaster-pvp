import React from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <section className="section-signup section">
      <div className="container flex-col items-center">

        <h1 className="title">
          Sign Up
        </h1>

        <p className="text-base mt-6">
          Already have an account? <Link className="link text-base duration-250 text-(--primary-orange-1) hover:underline" href="/account/signin">Click here</Link>
        </p>

        <form className="form flex flex-col items-center w-full mt-12 max-w-[480px]">
          <div className="fields w-full grid gap-[1px] grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(2,1fr)]">
            <input className="bg-white text-xs text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]" id="username" name="username" type="text" placeholder="Username*" required />
            <input className="bg-white text-xs text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]" id="password" name="password" type="text" placeholder="Password*" required />
            <input className="bg-white text-xs text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]" id="email" name="email" type="email" placeholder="Email*" required />
            <input className="bg-white text-xs text-(--gray-0) outline-none h-[4.8rem] px-[1.6rem]" id="phone" name="phone" type="text" placeholder="Phone" />
          </div>

          <button className="button-orange mt-12" type="button" aria-label="Click to Sign Up">
            Click to Sign Up
          </button>
        </form>

      </div>
    </section>
  );
}