"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hero } from '@/types/user'

interface TransferCharacterProps extends Hero {
  transferCharacter: boolean;
  setTransferCharacter: (value: boolean) => void;
}

export default function TransferCharacter({
  transferCharacter,
  setTransferCharacter,
  ...character
}: TransferCharacterProps) {
  const router = useRouter()
  const [targetUserId, setTargetUserId] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const pending = false

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert('Character transfer not yet implemented for MySQL')
  }

  async function onCancel() {
    alert('Character transfer not yet implemented for MySQL')
  }

  return <div className="transfer-character w-full min-w-0">
    <button
      className="cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1) disabled:opacity-40"
      type="button"
      onClick={() => setTransferCharacter(!transferCharacter)}
      disabled={sending}
    >
      Return
    </button>

    <p className="text-base mt-8">
      Character ID:<br/>
      <strong className="text-ellipsis block overflow-hidden w-full relative text-nowrap">{character.id_idx}</strong>
    </p>

    <p className="text-base mt-4">
      {pending 
        ? `Transfer pending. Awaiting target user acceptance.`
        : `Set target user ID to transfer.`
      }
    </p>

    <form onSubmit={onSubmit} className="fields flex flex-col gap-8 w-full min-w-0">
      {!pending && (
        <div className="field flex flex-col mt-6 w-full max-w-[24rem] min-w-0">
          <input
            className="text-sm text-center text-(--gray-0) outline-none min-w-0 w-full h-[4rem] px-[1.6rem] bg-white"
            placeholder="Type here..."
            value={targetUserId}
            onChange={e => setTargetUserId(e.target.value)}
            disabled={sending}
            required
          />
          <button
            className="
              cursor-pointer
              text-sm font-bold
              flex items-center justify-center
              mt-4 w-full min-h-[4rem] min-w-0
              duration-[.25s] bg-(--primary-orange-1) hover:bg-(--primary-orange-2)
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            type="submit"
            disabled={sending || !targetUserId.trim()}
          >
            {sending ? '...' : 'Send'}
          </button>
        </div>
      )}

      {pending && (
        <div className="flex flex-col mt-4">
          <div className="text-base">
            Transfer pending...
          </div>

          <button
            className="
              cursor-pointer
              text-sm font-bold
              flex items-center justify-center
              mt-8 w-[12rem] min-h-[4rem]
              duration-[.25s] bg-(--primary-orange-1) hover:bg-(--primary-orange-2)
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            type="button"
            onClick={onCancel}
            disabled={sending}
          >
            {sending ? '...' : 'Cancel'}
          </button>
        </div>
      )}

      {error &&
        <p className="text-sm text-(--primary-red-1)">
          {error}
        </p>
      }
    </form>
  </div>
}