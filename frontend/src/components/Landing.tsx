import React from 'react';
import Link from 'next/link';

import Logo from '@/components/header/Logo';
import BackgroundMix from '@/components/BackgroundMix';

const Landing: React.FC = () => {
  return (
    <main className="flex flex-1 bg-gradient-to-b from-black to-(--gray-0) sm:items-center relative">
      <section className="section-landing w-full m-[0!important]">
        <div className="container relative flex-col items-center justify-center z-5">
          
          <div className="logo-mm mb-8">
            <Logo height={128} full={true} />
          </div>

          <h1 className="title text-white mb-6">
            MixMaster PVP ⚔️
          </h1>

          <p className="text-big text-white text-center max-w-120">
            No grind. Log in and go fight.
          </p>

          <p className="text-big text-white text-center font-bold max-w-120 mt-8">
            Coming soon!
          </p>

        </div>

        <BackgroundMix char1="phoy" char2="jin" />

        <svg className="absolute top-0 left-0 w-full pointer-events-none z-1 rotate-[180deg]" viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg">
          <path className="fill-(--gray-0)" d="M0,0L1440,40L1440,40L0,40Z"></path>
        </svg>

        <svg className="absolute bottom-0 left-0 w-full pointer-events-none z-1" viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg">
          <path className="fill-(--gray-1)" d="M0,0L1440,40L1440,40L0,40Z"></path>
        </svg>
      </section>
    </main>
  );
};

export default Landing;