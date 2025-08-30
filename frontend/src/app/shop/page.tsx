import React from 'react';
import Link from 'next/link';

export default function ShopPage() {
  return (
    <main className="flex flex-1 bg-gradient-to-b from-black to-(--gray-0) sm:items-center">
      <section className="section-shop section">
        <div className="container flex flex-col items-center text-left sm:text-center">

          <h1 className="title text-center">
            Store ❔
          </h1>

          <p className="text-base text-white w-full mt-6">
            No! We don't sell anything. <br/>
            Theres no game advantages you can buy with cash in this server.
          </p>

          <p className="text-base text-white w-full mt-6">
            But you can still help us with a donate. <br/>
            All donates goes to game server host payment. <br/>
            You can see monthly achieve progress below.
          </p>

          <div className="progress-bar flex flex-col items-center w-full mt-12">
            <div className="bar flex relative w-full max-w-160">
              <div className="background w-full h-[4px] rounded-[1.6rem] bg-(--gray-1)"></div>
              <div className={`progress absolute top-0 left-0 min-w-[1%] h-[4px] rounded-[1.6rem] bg-(--primary-orange-1)`}></div>
            </div>

            <p className="text text-xs text-white mt-4">
              R$ 1,00 / <strong>R$ 100,00</strong>
            </p>
          </div>

          <strong className="text-base text-white w-full mt-12">
            Server will stay online even without a fully charged bar. <span className="font-normal line-through text-(--gray-3)">fow now</span> <br/>
            When you donate you are just helping the project.
          </strong>

          <Link className="button-orange mt-12" href="#">
            Call to Action
          </Link>

        </div>
      </section>
    </main>
  );
}