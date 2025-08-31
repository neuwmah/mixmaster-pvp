"use client"
import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { checkMobile } from '@/hooks/checkMobile'

interface JobsProps {
  sending: boolean
  job: string
  setJob: (value: string) => void
}

const CLASSES: { value: string; label: string; image: string }[] = [
  { value: 'ditt', label: 'Ditt', image: '/assets/images/characters/char-ditt.png' },
  { value: 'jin', label: 'Jin', image: '/assets/images/characters/char-jin.png' },
  { value: 'penril', label: 'Penril', image: '/assets/images/characters/char-penril.png' },
  { value: 'phoy', label: 'Phoy', image: '/assets/images/characters/char-phoy.png' },
]

export default function Jobs({ sending, job, setJob }: JobsProps) {
  const mobile = checkMobile()
  const swiperRef = useRef<SwiperType | null>(null)

  // sincroniza slide quando job muda externamente
  useEffect(() => {
    const idx = CLASSES.findIndex(c => c.value === job)
    if (idx >= 0 && swiperRef.current && swiperRef.current.activeIndex !== idx) {
      swiperRef.current.slideTo(idx)
    }
  }, [job])

  return (
    <div className="jobs flex flex-col gap-4 p-[2.4rem] bg-(--black) border-[1px] border-(--gray-1) min-h-[28rem] overflow-hidden">

      <span className="text text-xs text-center">Select new character class.</span>

      <div className="carousel relative flex flex-1 w-full max-w-[20rem] mx-auto">
        <Swiper
          className="swiper-static swiper-fade-1"
          spaceBetween={mobile ? 16 : 24}
          slidesPerView={1}
          watchSlidesProgress
          modules={[Navigation]}
          speed={400}
          navigation
          onSwiper={(sw) => { swiperRef.current = sw }}
          onSlideChange={(sw) => {
            const cls = CLASSES[sw.activeIndex]
            if (cls && cls.value !== job) setJob(cls.value)
          }}
        >
          {CLASSES.map((c, index) => {
            return (
              <SwiperSlide key={c.value}>
                <button
                  type="button"
                  disabled={sending}
                  onClick={() => {
                    if (swiperRef.current && swiperRef.current.activeIndex !== index) {
                      swiperRef.current.slideTo(index)
                    }
                    setJob(c.value)
                  }}
                  className={`
                    group w-full h-full flex flex-col items-center justify-center overflow-hidden text-left duration-200 
                  `}
                >
                  <div className="flex justify-center relative w-full overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.label}
                      className={`object-cover ${c.value == 'phoy' ? 'max-h-[12rem]' : 'max-h-[16rem]'}`}
                    />
                  </div>
                </button>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      <span className="job text-xs text-center font-bold text-(--primary-orange-1)">
        {CLASSES.find(c => c.value === job)?.label}
      </span>

    </div>
  )
}