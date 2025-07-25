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
              className="flex flex-col items-center duration-250 text-(--white) hover:no-underline border-1 border-black hover:border-(--gray-1) group"
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

                <div className="w-full flex flex-col items-start p-8">
                  <p className="text-base font-medium">
                    {item.title}
                  </p>
                  <span className="text-xs no-underline mt-2 text-(--gray-4)">
                    {item.created_at}
                  </span>
                </div>

              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;