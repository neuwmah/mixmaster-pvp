import React from 'react';

import { _environment } from '@/utils/environment';

const Top: React.FC = () => {
  return (
    <section className="section-top section section-p bg-gradient-to-b from-black to-(--gray-0)">
      <div className="container flex flex-col items-center">

        <h1 className="title text-center">
          Mix DB 🐍
        </h1>

        <p className="text-base text-white text-center mt-6">
          Choose a hench below to expand details.
        </p>

      </div>
    </section>
  );
};

export default Top;