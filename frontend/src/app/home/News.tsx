import React from 'react';

import { getChangelogs } from '@/app/api/changelog';

import Carousel from '@/app/home/Carousel';

interface NewsProps {
  home?: boolean;
}

export default async function News({ home = true }: NewsProps) {
  const changelogsData = await getChangelogs();
  
  return changelogsData.length ? (
    <section className={`section-news ${home ? 'section-home' : 'w-full overflow-hidden z-1 relative bg-(--gray-a) m-0 py-16 sm:py-24'}`}>
      <div className="container flex-col items-center">

        <h2 className="title">
          Changelog {home ? '📝' : '⚙️'}
        </h2>

        <p className="text-big text-center mt-6 text-(--gray-4)">
          {home
            ? `Last updated at ${new Date(changelogsData[0].created_at).toLocaleDateString()}`
            : `Check current posts below.`
          }
        </p>

        <Carousel changelogs={changelogsData} home={home} />

      </div>
    </section>
  ) : ``
}