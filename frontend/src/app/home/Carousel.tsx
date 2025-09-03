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
  home?: boolean;
}

function resolveSrc(src: string | undefined) {
  if (!src) return undefined
  if (src.startsWith('/uploads/')) {
    const base = (process.env.NEXT_PUBLIC_BACKEND_API_URL || '').replace(/\/$/, '')
    return base + src
  }
  return src
}

const Carousel: React.FC<CarouselProps> = ({ changelogs, home = true }) => {
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
        {changelogs.map((item: Changelog) => item.active && (
          <SwiperSlide key={item.slug}>
            <Link
              className="flex flex-col items-center text-(--white) hover:no-underline hover:border-(--gray-1) group"
              href={`/changelog/${item.slug}`}
            >
              <div className={`
                w-full overflow-hidden z-1
                flex flex-col items-center
                ${home ? 'bg-(--gray-0)' : 'bg-(--black)'}
              `}>

                {item.image_src && (
                  <img
                    src={resolveSrc(item.image_src)}
                    alt={item.title}
                    className="w-full aspect-[2/1] object-cover"
                  />
                )}

                <div className={`
                  w-full p-8
                  flex flex-col items-start 
                  duration-250 
                  border-1
                  ${home ? 'border-(--gray-0)' : 'border-(--black)'}
                `}>
                  <p className="text-base font-medium">
                    {item.title}
                  </p>
                  <span className="text-xs no-underline mt-2 text-(--gray-4) group-hover:underline">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-sm no-underline mt-6 text-(--white) line-clamp-3 overflow-hidden">
                    {item.content1}
                  </span>
                </div>

              </div>
              <svg className="pointer-events-none rotate-[180deg] scale-x-[-1] mt-[-1px]" viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg">
                <path className="fill-(--primary-orange-1) duration-[.25s] group-hover:fill-(--gray-1)" d="M0,160L1440,0L1440,160L0,160Z"></path>
                <path className={home ? 'fill-(--gray-0)' : 'fill-(--black)'} d="M0,0L1440,160L1440,160L0,160Z"></path>
              </svg>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;