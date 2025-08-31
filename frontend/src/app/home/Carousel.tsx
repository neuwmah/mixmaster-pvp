"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { checkMobile } from '@/hooks/checkMobile';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Changelog } from '@/types/changelog';

interface CarouselProps {
  changelogs: Changelog[];
}

const Carousel: React.FC<CarouselProps> = ({ changelogs }) => {
  const mobile = checkMobile();
  const [enoughSlides, setEnoughSlides] = useState(false);

  useEffect(() => {
    setEnoughSlides(mobile
      ? changelogs.length > 1 
      : changelogs.length > 4
    );
  }, []);

  return (
    <div className={`
      carousel w-full mt-12 relative
      ${enoughSlides 
        ? "mb-[40px]" 
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
        {changelogs.map((item: Changelog) => (
          <SwiperSlide key={item.slug}>
            <Link
              className="flex flex-col items-center text-(--white) hover:no-underline hover:border-(--gray-1) group"
              href={`/changelog/${item.slug}`}
            >
              <div className="w-full overflow-hidden flex flex-col items-center bg-(--gray-0)">

                {item.image_src && (
                  <img
                    src={item.image_src}
                    alt={item.title}
                    className="w-full"
                  />
                )}

                <div className="w-full flex flex-col items-start p-8 duration-250 border-1 border-(--gray-0) group-hover:border-(--gray-1)">
                  <p className="text-base font-medium">
                    {item.title}
                  </p>
                  <span className="text-xs no-underline mt-2 text-(--gray-4)">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-sm no-underline mt-6 text-(--white) line-clamp-3 overflow-hidden">
                    {item.content1}
                  </span>
                </div>

              </div>
              <svg className="pointer-events-none rotate-[180deg] scale-x-[-1]" viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg">
                <path className="fill-(--primary-orange-1)" d="M0,160L1440,0L1440,160L0,160Z"></path>
                <path className="fill-(--gray-1)" d="M0,0L1440,160L1440,160L0,160Z"></path>
              </svg>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;