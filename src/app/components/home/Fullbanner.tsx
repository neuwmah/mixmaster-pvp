import React from 'react';
import Link from 'next/link';

const Fullbanner: React.FC = () => {
  return (
    <section className="section-fullbanner section relative h-200 m-0 bg-gradient-to-b from-black to-(--gray-0)">
      <img className="absolute object-cover w-full h-full opacity-16" src="/assets/images/waves.gif"></img>
      <div className="container relative flex-col items-center justify-center z-1">
        
        <h3 className="title text-white mb-6">
          MixMaster PVP
        </h3>

        <p className="text-base text-white text-center max-w-120">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="flex gap-1 mt-12">
          <Link className="button-main" href="/download">
            Download
          </Link>
          <Link className="button-secondary" href="/account/signup">
            Sign Up
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Fullbanner;