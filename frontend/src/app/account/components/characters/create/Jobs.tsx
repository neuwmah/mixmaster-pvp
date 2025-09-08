"use client"
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

import { checkMobile } from '@/hooks/checkMobile'

interface JobsProps {
  sending: boolean
  job: string
  backgroundRef: any
  setJob: (value: string) => void
}

const CLASSES: { value: string; label: string; image: string; desc: string }[] = [
  { value: 'ditt', label: 'Ditt', image: '/assets/images/characters/char-ditt.png', desc: 'Swordsman' },
  { value: 'jin', label: 'Jin', image: '/assets/images/characters/char-jin.png', desc: 'Boxer' },
  { value: 'penril', label: 'Penril', image: '/assets/images/characters/char-penril.png', desc: 'Archer' },
  { value: 'phoy', label: 'Phoy', image: '/assets/images/characters/char-phoy.png', desc: 'Gunslinger' },
]

export default function Jobs({ sending, job, backgroundRef, setJob }: JobsProps) {
  const mobile = checkMobile()
  const swiperRef = useRef<SwiperType | null>(null)
  const prevIndexRef = useRef(0)

  useEffect(() => {
    const idx = CLASSES.findIndex(c => c.value === job)
    if (idx >= 0 && swiperRef.current && swiperRef.current.activeIndex !== idx) {
      swiperRef.current.slideTo(idx)
    }
  }, [job])

  return (
    <div className="jobs flex flex-col gap-8 p-[2.4rem] bg-[rgba(0,0,0,.7)] border-[1px] border-(--gray-1) border-dashed rounded-[.8rem] min-h-[28rem] overflow-hidden">

      <span className="text text-base text-center">Select character class.</span>

      <div className="carousel relative flex flex-1 w-full mx-auto">
        <Swiper
          className="swiper-static swiper-fade-1"
          spaceBetween={mobile ? 16 : 24}
          slidesPerView={1}
          watchSlidesProgress
          modules={[Navigation]}
          speed={700}
          navigation
          onSwiper={(sw) => { 
            swiperRef.current = sw
            prevIndexRef.current = sw.activeIndex
          }}
          onSlideChange={(sw) => {
            const cls = CLASSES[sw.activeIndex]
            if (cls && cls.value !== job) setJob(cls.value)

            if (backgroundRef?.current) {
              const prev = prevIndexRef.current
              const curr = sw.activeIndex
              if (curr !== prev) {
                const diff = Math.abs(curr - prev)
                if (diff === 1) {
                  if (curr > prev && typeof backgroundRef.current.slideNext === 'function') {
                    backgroundRef.current.slideNext()
                  } else if (curr < prev && typeof backgroundRef.current.slidePrev === 'function') {
                    backgroundRef.current.slidePrev()
                  } else if (typeof backgroundRef.current.slideTo === 'function') {
                    backgroundRef.current.slideTo(curr)
                  }
                } else if (typeof backgroundRef.current.slideTo === 'function') {
                  backgroundRef.current.slideTo(curr)
                }
              }
              prevIndexRef.current = curr
            }
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
                    group w-full h-full flex flex-col items-center justify-center overflow-hidden text-left duration-[.25s] 
                  `}
                >
                  <div className="flex justify-center relative w-full overflow-hidden">
                    <Image
                      unoptimized
                      width={500}
                      height={500}
                      src={c.image}
                      alt={c.label}
                      className={`
                        object-contain 
                        aspect-[1/3]
                        text-[0]
                        ${c.value == 'phoy' ? 'max-h-[20rem]' : 'max-h-[24rem]'}
                      `}
                    />
                  </div>
                </button>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      <span className="job text-big text-center font-bold text-(--primary-orange-1)">
        {CLASSES.find(c => c.value === job)?.label}
      </span>

      <span className="desc text-sm text-center text-white mt-[-2rem]">
        {CLASSES.find(c => c.value === job)?.desc}
      </span>

    </div>
  )
}