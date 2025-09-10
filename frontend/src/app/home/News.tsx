import React from 'react';

import { getChangelogs } from '@/app/api/changelog';

import Carousel from '@/app/home/news/Carousel';
import ButtonCreate from '@/app/home/news/ButtonCreate';

interface NewsProps {
  home?: boolean;
}

export default async function News({ home = true }: NewsProps) {
  const changelogsData = await getChangelogs();
  
  return changelogsData.length ? (
    <section className={`
      section-news 
      ${home 
        ? 'section-home' 
        : 'w-full overflow-hidden z-1 relative bg-(--gray-a) m-0 py-16 sm:py-24'
      }
      ${changelogsData.length <= 4
        ? home
          ? "sm:!mb-32"
          : "sm:!pb-32"
        : ""
      }
    `}>
      <div className="container flex-col items-center">

        <h2 className="title">
          Changelog {home ? '📝' : '⚙️'}
        </h2>

        <p className="text-big text-center mt-6 text-(--gray-4)">
          {home
            ? `Last updated at ${new Date(changelogsData[0].created_at).toLocaleDateString()}`
            : <>
              Check current posts below. Or
              <ButtonCreate className="
                button-create
                underline
                ml-[.4rem]
                cursor-pointer
                duration-[.25s]
                hover:text-(--primary-orange-1)
              ">
                click to create
              </ButtonCreate> a new one.
            </>
          }
        </p>

        <Carousel changelogs={changelogsData} home={home} />

      </div>
    </section>
  ) : ``
}