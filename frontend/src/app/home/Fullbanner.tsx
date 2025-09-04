import React from 'react';
import Link from 'next/link';

import Logo from '@/components/header/Logo';
import BackgroundMix from '@/components/BackgroundMix';

const Fullbanner: React.FC = () => {
  return (
    <section className="section-fullbanner section-home relative h-200 bg-gradient-to-b from-black to-(--gray-0) m-[0!important]">
      <div className="container relative flex-col items-center justify-center z-1">
        
        <div className="logo-mm mb-6">
          <Logo height={128} full={true} />
        </div>

        <h1 className="title text-white mb-6">
          MixMaster PVP ⚔️
        </h1>

        <p className="text-big text-white text-center max-w-120">
          No grind. Log in and go fight.
        </p>

        <div className="flex gap-1 mt-12">
          <Link className="button-orange" href="/download">
            Download 🎮
          </Link>
          <Link className="button-secondary" href="/account/signup">
            Sign Up 👤
          </Link>
        </div>

      </div>

      <BackgroundMix char1="phoy" char2="jin" />

      <svg className="absolute top-0 left-0 w-full pointer-events-none z-1 rotate-[180deg]" viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg">
        <path className="fill-(--gray-0)" d="M0,0L1440,40L1440,40L0,40Z"></path>
      </svg>

      <svg className="absolute bottom-0 left-0 w-full pointer-events-none z-1" viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg">
        <path className="fill-(--gray-1)" d="M0,0L1440,40L1440,40L0,40Z"></path>
      </svg>
    </section>
  );
};

export default Fullbanner;