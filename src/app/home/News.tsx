import React from 'react';

import { getChangelogs } from '@/api/changelogs';

import Carousel from '@/app/home/Carousel';

const News: React.FC = async () => {
  const changelogsData = await getChangelogs();
  
  return (
    <section className="section-news section-home">
      <div className="container flex-col items-center">

        <h2 className="title">
          Changelog 💻
        </h2>

        <p className="text-xs text-center mt-2 text-(--gray-4)">
          Last updated at 07/20/2025
        </p>

        <Carousel changelogs={changelogsData} />

      </div>
    </section>
  );
};

export default News;