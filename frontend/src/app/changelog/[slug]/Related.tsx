import React from 'react';

import { getChangelogs } from '@/app/api/changelog';

import Carousel from '@/app/home/news/Carousel';

const Related: React.FC = async () => {
  const changelogsData = await getChangelogs();
  
  return changelogsData.length ? (
    <section className="section-related section-home">
      <div className="container flex-col items-center">

        <h2 className="title">
          Changelog 📝
        </h2>

        <p className="text-big text-center mt-6 text-(--gray-4)">
          Last updated at {new Date(changelogsData[0].created_at).toLocaleDateString()}
        </p>

        <Carousel changelogs={changelogsData} />

      </div>
    </section>
  ) : ``
};

export default Related;