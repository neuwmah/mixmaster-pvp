"use client"
import React, { useState, useEffect, useRef } from 'react'

import { getCharacter } from '@/app/api/character'

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
}

export default function Card(props: CardProps) {
  const {
    hoveredId,
    setHoveredId,
    setPetsList,
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
    let active = true
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
  let opacityClass = 'opacity-100'
  if (hoveredId) {
    brightnessClass = hoveredId === character.id
      ? 'filter-[brightness(.2)blur(.4rem)]'
      : 'filter-[brightness(.1)blur(.4rem)]'
    opacityClass = hoveredId === character.id
      ? 'opacity-100'
      : 'opacity-0'
  }

  return (
    <div
      className="
        card
        text-ellipsis
        pointer-events-auto
        relative overflow-hidden
        bg-(--black)
        min-h-[38rem] min-w-0 p-8 sm:w-[calc(33.333%-1.0666rem)] sm:min-w-[calc(20%-1.0666rem)]
        duration-[.25s]
      "
      onMouseEnter={() => setHoveredId?.(character.id)}
      onMouseLeave={() => setHoveredId?.(null)}
    >
      <img
        className={`
          absolute top-0 left-0 object-cover object-bottom w-full h-full opacity-[.7]
          ${brightnessClass}
          duration-[.25s]
        `}
        src={`/assets/images/characters/${charData.class.toLowerCase()}.jpg`}
        alt={`char-${charData.id}-${charData.class}`}
      />

      {charData.transferPending && (
        <div className="absolute bottom-0 right-0 px-4 py-2 bg-(--primary-orange-1) text-white text-xs font-bold z-10">
          PENDING...
        </div>
      )}

      <div className="relative z-1">
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

      <Actions character={charData} edit={edit} deleting={deleting} setEdit={setEdit} setDeleting={setDeleting} setPetsList={setPetsList} />
    </div>
  )
}