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
      // setError(res.error)
      // setSending(false)
      return
    }
    setTransferCharacter(false)
    router.refresh()
  }

  return <>
    <button
      className="cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1) disabled:opacity-40"
      type="button"
      onClick={() => setTransferCharacter(!transferCharacter)}
      disabled={sending}
    >
      Return
    </button>

    <p className="text-sm mt-8">
      Current user ID:<br/>
      <strong>{character.userId}</strong>
    </p>

    <p className="text-sm mt-4">
      {pending 
        ? `Transfer pending. Awaiting target user acceptance.`
        : `Set target user ID to transfer.`
      }
    </p>

    <form onSubmit={onSubmit} className="fields flex flex-col gap-8 mt-4">
      {!pending && (
        <div className="field flex">
          <input
            className="text-xs text-(--gray-0) w-full outline-none min-w-0 h-[3.2rem] px-[.8rem] bg-white"
            placeholder="Type here..."
            value={targetUserId}
            onChange={e => setTargetUserId(e.target.value)}
            disabled={sending}
            required
          />
          <button
            className="text-xs font-bold flex items-center justify-center min-w-[8rem] w-[8rem] ml-4 bg-(--primary-orange-1) cursor-pointer duration-[.25s] hover:bg-(--primary-orange-2) disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={sending || !targetUserId.trim()}
          >
            {sending ? '...' : 'Send'}
          </button>
        </div>
      )}

      {pending && (
        <div className="flex flex-col gap-8">
          <div className="text-sm">
            Target user ID:<br/>
            <strong>{character.transferTargetUserId}</strong>
          </div>

          <div className="flex gap-4">
            <button
              className="text-xs font-bold flex items-center justify-center w-[8rem] bg-(--primary-orange-1) cursor-pointer duration-[.25s] hover:bg-(--primary-orange-2) disabled:opacity-50 disabled:cursor-not-allowed h-[3.2rem]"
              type="button"
              onClick={onCancel}
              disabled={sending}
            >
              {sending ? '...' : 'Cancel'}
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-(--primary-red-1)">{error}</p>}
    </form>
  </>
}