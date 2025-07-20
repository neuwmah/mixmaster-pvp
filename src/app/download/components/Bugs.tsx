import React from 'react';
import Link from 'next/link';

const Bugs: React.FC = () => {
  return (
    <section className="section-bugs section py-[64px] bg-(--gray-0)">
      <div className="container flex flex-col items-center">

        <h1 className="title text-center">
          Having trouble?
        </h1>

        <p className="text-base text-white text-center mt-6">
          Contact us via <Link className="text-(--personal) hover:underline" href="#">Discord</Link>.
        </p>

      </div>
    </section>
  );
};

export default Bugs;