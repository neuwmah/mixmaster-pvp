"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import {
  ArrowUturnLeftIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

import Infos from '@/app/account/components/characters/card/Infos'
import Edit from '@/app/account/components/characters/card/Edit'
import ResetPosition from '@/app/account/components/characters/card/_ResetPosition'
import TransferCharacter from '@/app/account/components/characters/card/_TransferCharacter'
import ChangeNickname from '@/app/account/components/characters/card/_ChangeNickname'

import { deleteCharacter, getCharacter } from '@/app/api/character'
import { Character } from '@/types/character'

interface CardProps extends Character {
  hoveredId?: string | null
  setHoveredId?: (id: string | null) => void
}

export default function Card(props: CardProps) {
  const {
    hoveredId,
    setHoveredId,
    ...character
  } = props

  const [edit, setEdit] = useState(false)
  const [changeNickname, setChangeNickname] = useState(false)
  const [transferCharacter, setTransferCharacter] = useState(false)
  const [resetPosition, setResetPosition] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [charData, setCharData] = useState(character)
  const router = useRouter()

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
    const id = setInterval(refresh, 5000)
    return () => { active = false; clearInterval(id) }
  }, [character.id])

  useEffect(() => {
    setCharData(prev => prev.name !== character.name ? { ...prev, name: character.name } : prev)
  }, [character.name])

  async function removeCharacter() {
    if (charData.transferPending) return
    if (deleting) return
    if (!window.confirm('Are you sure?')) return
    setDeleting(true)
    const ok = await deleteCharacter(character.id)
    if (!ok) {
      alert('Error deleting character.')
      setDeleting(false)
      return
    }
    router.refresh()
  }

  let brightnessClass = 'filter-[brightness(.2)blur(.4rem)]'
  if (hoveredId) {
    brightnessClass = hoveredId === character.id
      ? 'filter-[brightness(.2)blur(.4rem)]'
      : 'filter-[brightness(.1)blur(.4rem)]'
  }

  return (
    <div
      className="
        info
        text-ellipsis
        pointer-events-auto
        relative overflow-hidden
        bg-(--black)
        min-h-[32rem] min-w-0 p-8 sm:w-[calc(33.333%-1.0666rem)]
        transition-colors
      "
      onMouseEnter={() => setHoveredId?.(character.id)}
      onMouseLeave={() => setHoveredId?.(null)}
    >
      <img
        className={`
          absolute top-0 left-0 object-cover w-full h-full opacity-[.7]
          ${brightnessClass}
          transition-[filter] duration-[.25s]
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

      <div className="absolute pointer-events-none p-8 top-0 right-0 z-1 flex flex-col gap-8">
        <button
          className="group relative pointer-events-auto cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1)"
          type="button"
          onClick={() => setEdit(!edit)}
        >
          <span className="text-xs text-white pointer-events-none absolute right-[calc(100%+.8rem)] top-[50%] translate-y-[-50%] opacity-0 duration-[.25s] group-hover:opacity-100">
            {edit ? 'Return' : 'Edit'}
          </span>
          {edit
            ? <ArrowUturnLeftIcon className="icon" />
            : <PencilSquareIcon className="icon" />
          }
        </button>
        <button
          className="group relative pointer-events-auto cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1) disabled:opacity-40 disabled:cursor-not-allowed"
          type="button"
          onClick={removeCharacter}
          disabled={deleting || !!charData.transferPending}
        >
          <span className="text-xs text-white pointer-events-none absolute right-[calc(100%+.8rem)] top-[50%] translate-y-[-50%] opacity-0 duration-[.25s] group-hover:opacity-100">
            Remove
          </span>
          {deleting ? '...' : <TrashIcon className="icon" />}
        </button>
      </div>
    </div>
  )
}