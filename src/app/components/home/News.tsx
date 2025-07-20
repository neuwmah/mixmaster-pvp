"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useMobile } from '@/app/hooks/checkMobile';

import { changelogData } from '@/app/changelog/data';

const News: React.FC = () => {
  const mobile = useMobile();
  const [enoughSlides, setEnoughSlides] = useState(false);

  useEffect(() => {
    setEnoughSlides(mobile
      ? changelogData.length > 1 
      : changelogData.length > 4
    );
  }, []);

  return (
    <section className="section-news section">
      <div className="container flex-col items-center">

        <h3 className="title">
          Changelog
        </h3>

        <p className="text-base text-white text-center max-w-120 mt-6">
          Last updated at 07/20/2025
        </p>

        <div className={`
          w-full mt-12 relative
          ${enoughSlides 
            ? "mb-[48px]" 
            : ""
          }
          ${mobile 
            ? "px-[48px]" 
            : "px-[64px]"
          }`
        }>
          <Swiper
            className="swiper-static swiper-fade-4"
            spaceBetween={mobile ? 16 : 24}
            slidesPerView={mobile ? 1 : 4}
            watchSlidesProgress
            modules={[Navigation, Pagination]}
            speed={400}
            pagination={{ clickable: true }}
            navigation
          >
            {changelogData.map(item => (
              <SwiperSlide key={item.slug}>
                <Link className="flex flex-col items-center duration-250 text-(--white) hover:no-underline border-1 border-black hover:border-(--gray-2) group" href={`/changelog/${item.slug}`}>
                  <div className="w-full overflow-hidden flex flex-col items-center bg-(--gray-0)">

                    {item.image_src && (
                      <img
                        src={item.image_src}
                        alt={item.title}
                        className="w-full"
                      />
                    )}

                    <div className="w-full flex flex-col items-start p-8">
                      <p className="text-base font-medium">{item.title}</p>
                      <span className="text-xs no-underline mt-2 text-(--gray-4)">{item.date}</span>
                    </div>

                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default News;