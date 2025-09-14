"use client"
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

import { getCharacter } from '@/app/api/character'
import { getIcon } from '@/app/account/components/hench/pets/image'

import Infos from '@/app/account/components/characters/manage/card/Infos'
import Edit from '@/app/account/components/characters/manage/card/Edit'
import Actions from '@/app/account/components/characters/manage/card/Actions'
import ResetPosition from '@/app/account/components/characters/manage/card/_ResetPosition'
import TransferCharacter from '@/app/account/components/characters/manage/card/_TransferCharacter'
import ChangeNickname from '@/app/account/components/characters/manage/card/_ChangeNickname'

import { Character } from '@/types/character'

interface CardProps extends Character {
  hoveredId?: string | null
  setHoveredId?: (id: string | null) => void
  setPetsList: (value: Character | undefined) => void
  setItems: (value: Character | undefined) => void
}

export default function Card(props: CardProps) {
  const {
    hoveredId,
    setHoveredId,
    setPetsList,
    setItems,
    ...character
  } = props

  const [edit, setEdit] = useState(false)
  const [changeNickname, setChangeNickname] = useState(false)
  const [transferCharacter, setTransferCharacter] = useState(false)
  const [resetPosition, setResetPosition] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [charData, setCharData] = useState(character)

  const prevPendingRef = useRef<boolean | null>(null)
  useEffect(() => {
    if (prevPendingRef.current === true && charData.transferPending === false) {
      if (typeof window !== 'undefined') window.location.reload()
    }
    prevPendingRef.current = !!charData.transferPending
  }, [charData.transferPending])

  useEffect(() => {
    const active = true
    async function refresh() {
      const latest = await getCharacter(character.id)
      if (!active || !latest) return
      setCharData(prev => (
        prev.transferPending !== latest.transferPending || prev.transferTargetUserId !== latest.transferTargetUserId
          ? { ...prev, transferPending: latest.transferPending, transferTargetUserId: latest.transferTargetUserId }
          : prev
      ))
    }
    refresh()
  }, [character.id])

  useEffect(() => {
    setCharData(prev => prev.name !== character.name ? { ...prev, name: character.name } : prev)
  }, [character.name])

  let brightnessClass = 'filter-[brightness(.2)blur(.4rem)]'
  if (hoveredId)
    brightnessClass = hoveredId === character.id
      ? 'filter-[brightness(.2)blur(.4rem)]'
      : 'filter-[brightness(.1)blur(.4rem)]'

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
      onMouseEnter={() => setHoveredId?.(character.id)}
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
        src={`/assets/images/characters/${charData.class.toLowerCase()}.jpg`}
        alt={`char-${charData.id}-${charData.class}`}
      />

      {charData.transferPending && (
        <div className="absolute bottom-0 right-0 px-4 py-2 bg-(--primary-orange-1) text-white text-xs font-bold z-10">
          PENDING...
        </div>
      )}

      <div className="relative z-1 h-auto w-full">
        {edit
          ? (changeNickname
            ? <ChangeNickname {...charData} changeNickname={changeNickname} setChangeNickname={setChangeNickname} onUpdatedName={(n) => setCharData(prev => ({ ...prev, name: n }))} />
            : transferCharacter
              ? <TransferCharacter {...charData} transferCharacter={transferCharacter} setTransferCharacter={setTransferCharacter} />
              : resetPosition
                ? <ResetPosition {...charData} resetPosition={resetPosition} setResetPosition={setResetPosition} onUpdatedMap={(m) => setCharData(prev => ({ ...prev, map: m }))} />
                : <Edit
                  {...charData}
                  changeNickname={changeNickname}
                  setChangeNickname={setChangeNickname}
                  resetPosition={resetPosition}
                  setResetPosition={setResetPosition}
                  transferCharacter={transferCharacter}
                  setTransferCharacter={setTransferCharacter}
                />
            )
          : <Infos {...charData} />
        }
      </div>

      {character.pets && character.pets.length > 0 ?
        <div className="pets flex relative w-full gap-4 z-1 mt-12">
          {character.pets.map((pet, i) => pet.in_party && (
            <div className="pet rounded-full border-[1px] border-(--black)" key={`pet${i}`}>
              <Image
                unoptimized
                width={40}
                height={40}
                src={getIcon(pet.henchId)}
                alt={pet.nickname}
                className="object-contain w-[4rem] h-[4rem] rounded-full"
                loading="lazy"
                title={pet.nickname}
              />
            </div>
          ))}
        </div>
      : ''}

      <Actions character={charData} edit={edit} deleting={deleting} setEdit={setEdit} setDeleting={setDeleting} setPetsList={setPetsList} setItems={setItems} />
    </div>
  )
}