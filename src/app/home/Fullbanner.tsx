import React from 'react';
import Link from 'next/link';

import Logo from '@/components/header/Logo';

const Fullbanner: React.FC = () => {
  return (
    <section className="section-fullbanner section-home relative h-200 bg-gradient-to-b from-black to-(--gray-0) m-[0!important]">
      <div className="container relative flex-col items-center justify-center z-1">
        
        <div className="logo-mm mb-6">
          <Logo height={128} />
        </div>

        <h1 className="title text-white mb-6">
          MixMaster PVP
        </h1>

        <p className="text-base text-white text-center max-w-120">
          No grind. Log in and go fight.
        </p>

        <div className="flex gap-1 mt-12">
          <Link className="button-orange" href="/download">
            Download ⚔️
          </Link>
          <Link className="button-secondary" href="/account/signup">
            Sign Up 👤
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Fullbanner;