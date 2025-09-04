"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Character } from '@/types/character'
import { updateCharacter } from '@/app/api/character'

interface ResetPositionProps extends Character {
  resetPosition: boolean
  setResetPosition: (value: boolean) => void
  onUpdatedMap?: (map: string) => void
}

const cities = ['magirita', 'mekrita', 'herseba', 'rudis', 'purmai'] as const

export default function ResetPosition({
  resetPosition,
  setResetPosition,
  onUpdatedMap,
  ...character
}: ResetPositionProps) {
  const [newCity, setNewCity] = useState(character.map.toLowerCase())
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (sending) return
    if (newCity === character.map.toLowerCase()) {
      setResetPosition(false)
      return
    }
    setSending(true)
    setError('')
    const res = await updateCharacter(character.id, { map: newCity })
    if (res.error) {
      setError(res.error)
      setSending(false)
      return
    }
    onUpdatedMap?.(newCity)
    setResetPosition(false)
    router.refresh()
  }

  return <div className="reset-position w-full min-w-0">
    <button
      className="cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1) disabled:opacity-40"
      type="button"
      disabled={sending}
      onClick={() => setResetPosition(!resetPosition)}
    >
      Return
    </button>

    <p className="text-base mt-8">
      Current map: <strong className="capitalize">{character.map}</strong>
    </p>

    <p className="text-base mt-4">
      Select a new city to transfer.
    </p>

    <form className="fields flex flex-col mt-6 w-full min-w-0" onSubmit={onSubmit}>
      <div className="position">

        <div className="field flex flex-col w-full max-w-[24rem] min-w-0">
          <div className="select relative w-full min-w-0">
            <select
              className="
                capitalize
                text-xs text-(--gray-0)
                appearance-none
                outline-none
                h-[4rem] w-full
                pr-[3.2rem] pl-[1.6rem]
                bg-white
                cursor-pointer
                border-none
                duration-[.25s]
              "
              value={newCity}
              onChange={e => setNewCity(e.target.value)}
              disabled={sending}
            >
              {cities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[1.6rem]">
              <svg
                className="pointer-events-none w-[1.6rem] h-[1.6rem] text-(--gray-0)"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>

          <button
            className="
              cursor-pointer
              text-xs font-bold
              flex items-center justify-center
              mt-4 w-full min-h-[4rem]
              duration-[.25s] bg-(--primary-orange-1) hover:bg-(--primary-orange-2)
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            type="submit"
            disabled={sending || newCity === character.map.toLowerCase()}
          >
            {sending ? '...' : 'Update'}
          </button>
        </div>

        {error && 
          <p className="text-sm text-(--primary-red-1) mt-4">
            {error}
          </p>
        }

      </div>
    </form>

  </div>
}