"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Character } from '@/types/character'
import { updateCharacter } from '@/app/api/character'

interface ChangeNicknameProps extends Character {
  changeNickname: boolean
  setChangeNickname: (value: boolean) => void
  onUpdatedName?: (name: string) => void
}

export default function ChangeNickname({
  changeNickname,
  setChangeNickname,
  onUpdatedName,
  ...character
}: ChangeNicknameProps) {
  const [newName, setNewName] = useState(character.name)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (sending) return
    if (newName === character.name) {
      setChangeNickname(false)
      return
    }
    setSending(true)
    setError('')
    const res = await updateCharacter(character.id, { name: newName })
    if (res.error) {
      setError(res.error)
      setSending(false)
      return
    }
    onUpdatedName?.(newName)
    router.refresh()
    setChangeNickname(false)
  }

  return <div className="change-nickname w-full min-w-0">
    <button
      className="cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1) disabled:opacity-40"
      type="button"
      disabled={sending}
      onClick={() => setChangeNickname(!changeNickname)}
    >
      Return
    </button>

    <p className="text-base mt-8">
      Current name: <strong>{character.name}</strong>
    </p>

    <p className="text-base mt-4">
      Set character new nickname.
    </p>

    <form className="fields flex flex-col mt-6" onSubmit={onSubmit}>
      <div className="nickname">

        <div className="field flex flex-col w-full max-w-[24rem] min-w-0">
          <input
            className="text-sm text-center text-(--gray-0) outline-none min-w-0 min-h-[4rem] px-[1.6rem] w-full bg-white flex-1"
            id="name"
            name="name"
            type="text"
            placeholder="Type here..."
            value={newName}
            onChange={e => setNewName(e.target.value)}
            minLength={3}
            maxLength={12}
            disabled={sending}
            required
          />

          <button
            className="
              cursor-pointer
              text-sm font-bold
              flex items-center justify-center
              mt-4 w-full min-h-[4rem]
              duration-[.25s] bg-(--primary-orange-1) hover:bg-(--primary-orange-2)
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            type="submit"
            disabled={sending || newName.trim().length < 3}
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