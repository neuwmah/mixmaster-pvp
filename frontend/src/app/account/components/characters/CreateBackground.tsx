"use client"
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'

import { checkMobile } from '@/hooks/checkMobile'

const CLASSES: { value: string; label: string; image: string }[] = [
  { value: 'ditt', label: 'Ditt', image: '/assets/images/characters/char-ditt.png' },
  { value: 'jin', label: 'Jin', image: '/assets/images/characters/char-jin.png' },
  { value: 'penril', label: 'Penril', image: '/assets/images/characters/char-penril.png' },
  { value: 'phoy', label: 'Phoy', image: '/assets/images/characters/char-phoy.png' },
]

interface CreateBackgroundProps {
  backgroundRef?: any
}

export default function CreateBackground({ backgroundRef }: CreateBackgroundProps) {
  const mobile = checkMobile()

  return !mobile && (
    <div className="background absolute top-0 left-[50%] translate-x-[-50%] max-w-[1920px] w-full h-full">
      <div className="carousel absolute flex flex-1 w-full h-full">
        <Swiper
          className="swiper-absolute swiper-fade-1 top-0 left-0 w-full h-full"
          spaceBetween={0}
          slidesPerView={1}
          watchSlidesProgress
          speed={700}
          onSwiper={(sw) => { backgroundRef.current = sw }}
          simulateTouch={false}
          draggable={false}
        >
          {CLASSES.map((c) => {
            return (
              <SwiperSlide key={c.value}>
                <img
                  src={c.image}
                  alt={c.label}
                  className={`
                    object-contain
                    w-[560px] h-[560px]
                    mix-blend-darken brightness-[.3]
                    absolute top-[50%] left-[calc(80%)] translate-x-[-50%] translate-y-[-50%]
                  `}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}