import React from 'react';
import Kills from './components/Kills';
import Castles from './components/Castles';

export default function RankingPage() {

  const itemsClass = 'border border-(--gray-0) text-(--gray-4) py-4 px-6 w-1/3'
  const itemsTopClass = 'border border-(--gray-1) bg-(--gray-0) py-4 px-6 w-1/3'

  return (
    <section className="section-ranking section">
      <div className="container flex-col items-center">

        <h1 className="title text-center">
          Ranking ⭐
        </h1>

        <Kills itemsClass={itemsClass} itemsTopClass={itemsTopClass} />
        <Castles itemsClass={itemsClass} itemsTopClass={itemsTopClass} />

        <p className="text-sm mt-12 text-right w-full max-w-[500px]">
          Last updated at 07/23/2025
        </p>

      </div>
    </section>
  );
}