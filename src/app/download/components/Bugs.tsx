import React from 'react';
import Link from 'next/link';

const Bugs: React.FC = () => {
  return (
    <section className="section-bugs section bg-(--gray-0) py-[48px] sm:py-[64px]">
      <div className="container flex flex-col items-center">

        <h1 className="title text-center">
          Having trouble? ⛔
        </h1>

        <p className="text-base text-white text-center mt-6">
          Contact us via <Link className="text-(--discord) hover:underline" href="#">Discord</Link>.
        </p>

      </div>
    </section>
  );
};

export default Bugs;