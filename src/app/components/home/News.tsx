"use client"
import React from 'react';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useMobile } from '@/app/hooks/checkMobile';

const newsData = [
  { id: 1, title: 'Lorem ipsum dolor sit', image_src: '/assets/images/devnotes.webp', date: '07/20/2025', link: '#' },
  { id: 2, title: 'Consectetur adipiscing', image_src: '/assets/images/devnotes.webp', date: '07/20/2025', link: '#' },
  { id: 3, title: 'Sed do eiusmod tempor', image_src: '/assets/images/devnotes.webp', date: '07/20/2025', link: '#' },
  { id: 4, title: 'Incididunt ut labore', image_src: '/assets/images/devnotes.webp', date: '07/20/2025', link: '#' },
  { id: 5, title: 'Ut enim ad minim veniam', image_src: '/assets/images/devnotes.webp', date: '07/20/2025', link: '#' },
  { id: 6, title: 'Quis nostrud exercitation', image_src: '/assets/images/devnotes.webp', date: '07/20/2025', link: '#' },
  { id: 7, title: 'Sed do eiusmod tempor', image_src: '/assets/images/devnotes.webp', date: '07/20/2025', link: '#' },
];

const News: React.FC = () => {
  const mobile = useMobile();

  return (
    <section className="section-news section">
      <div className="container flex-col items-center">

        <h3 className="title">
          Changelog
        </h3>

        <p className="text-base text-white text-center max-w-120 mt-8">
          Last updated at 07/20/2025
        </p>

        <div className={`w-full mt-16 relative mb-[54px] ${mobile ? "px-[48px]" : "px-[64px]"}`}>
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
            {newsData.map(item => (
              <SwiperSlide key={item.id}>
                <Link className="flex flex-col items-center duration-250 text-(--white) hover:no-underline group" href={item.link}>
                  <div className="w-full overflow-hidden rounded-xl flex flex-col items-center bg-(--gray-0)">

                    {item.image_src && (
                      <img
                        src={item.image_src}
                        alt={item.title}
                        className="w-full"
                      />
                    )}

                    <div className="w-full flex flex-col items-start p-8">
                      <p className="text-base group-hover:underline">{item.title}</p>
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