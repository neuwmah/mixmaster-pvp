"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import Infos from '@/app/account/components/characters/manage/card/Infos'
import Actions from '@/app/account/components/characters/manage/card/Actions'

import { Hero } from '@/types/user'

interface CardProps extends Hero {
  hoveredId?: string | null
  setHoveredId?: (id: string | null) => void
  setPetsList: (value: Hero | undefined) => void
  setItems: (value: Hero | undefined) => void
}

export default function Card(props: CardProps) {
  const {
    hoveredId,
    setHoveredId,
    setPetsList,
    setItems,
    ...hero
  } = props

  const [heroData, setHeroData] = useState(hero)

  const heroKey = `${hero.id_idx}-${hero.hero_order}`

  let brightnessClass = 'filter-[brightness(.2)blur(.4rem)]'
  if (hoveredId)
    brightnessClass = hoveredId === heroKey
      ? 'filter-[brightness(.2)blur(.4rem)]'
      : 'filter-[brightness(.1)blur(.4rem)]'

  // Map class number to class name
  const getClassName = (classNum: number) => {
    const classes: { [key: number]: string } = {
      1: 'ditt',
      2: 'myu',
      3: 'jin',
      4: 'phoy',
      5: 'lydia',
      6: 'ren'
    }
    return classes[classNum] || 'ditt'
  }

  return (
    <div
      className="
        card
        text-ellipsis
        pointer-events-auto
        relative overflow-hidden
        w-full p-8
        min-w-0 sm:w-[calc(33.333%-1.0666rem)] sm:min-w-[calc(20%-1.0666rem)]
        bg-(--black)
      "
      onMouseEnter={() => setHoveredId?.(heroKey)}
      onMouseLeave={() => setHoveredId?.(null)}
    >
      <Image
        unoptimized
        width={500}
        height={500}
        className={`
          absolute top-0 left-0 object-cover object-bottom w-full h-full opacity-[.7]
          ${brightnessClass}
          duration-[.25s]
          pointer-events-none
        `}
        src={`/assets/images/characters/${getClassName(heroData.class)}.jpg`}
        alt={`hero-${heroData.id_idx}-${heroData.hero_order}-${getClassName(heroData.class)}`}
      />

      <div className="relative z-1 h-auto w-full">
        <Infos {...heroData} />
      </div>

      <Actions hero={heroData} setPetsList={setPetsList} setItems={setItems} />
    </div>
  )
}