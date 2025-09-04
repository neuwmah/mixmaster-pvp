"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Character } from '@/types/character'
import { initTransfer, cancelTransfer } from '@/app/api/character'

interface TransferCharacterProps extends Character {
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
  const pending = !!character.transferPending

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (sending || pending) return
    if (!targetUserId.trim()) {
      setError('Target user ID required')
      return
    }
    setSending(true)
    setError('')
    const res = await initTransfer(character.id, targetUserId.trim())
    if (res.error) {
      setError('User not found.')
      setSending(false)
      return
    }
    setTransferCharacter(false)
    router.refresh()
  }

  async function onCancel() {
    if (sending || !pending) return
    if (!window.confirm('Cancel this transfer?')) return
    setSending(true)
    setError('')
    const res = await cancelTransfer(character.id)
    if (res.error) {
      router.refresh()
      return
    }
    setTransferCharacter(false)
    router.refresh()
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
      Current user ID:<br/>
      <strong className="text-ellipsis block overflow-hidden w-full relative text-nowrap">{character.userId}</strong>
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
            className="text-xs text-(--gray-0) outline-none min-w-0 w-full h-[4rem] px-[1.6rem] bg-white"
            placeholder="Type here..."
            value={targetUserId}
            onChange={e => setTargetUserId(e.target.value)}
            disabled={sending}
            required
          />
          <button
            className="
              cursor-pointer
              text-xs font-bold
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
            Target user ID:<br/>
            <strong className="text-ellipsis block overflow-hidden w-full relative text-nowrap">{character.transferTargetUserId}</strong>
          </div>

          <button
            className="
              cursor-pointer
              text-xs font-bold
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