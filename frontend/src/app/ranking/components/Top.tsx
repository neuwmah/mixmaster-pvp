import React from 'react';

const Top: React.FC = () => {
  return (
    <section className="section-top section section-p bg-gradient-to-b from-black to-(--gray-0)">
      <div className="container flex flex-col items-center">

        <h1 className="title text-center">
          Ranking ⭐
        </h1>

        <p className="text-base text-white text-center mt-6">
          Check the top ranking players below.
        </p>

      </div>
    </section>
  );
};

export default Top;