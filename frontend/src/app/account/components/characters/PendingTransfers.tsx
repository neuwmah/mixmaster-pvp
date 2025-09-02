"use client"
import React, { useEffect, useState } from 'react'
import { getPendingTransfers, acceptTransfer, rejectTransfer } from '@/app/api/character'
import { Character } from '@/types/character'
import { useRouter } from 'next/navigation'

interface PendingTransfersProps { userId: string }

export default function PendingTransfers({ userId }: PendingTransfersProps) {
  const [list, setList] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [actionId, setActionId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  async function load(initial?: boolean) {
    if (initial) setLoading(true)
    try {
      const data = await getPendingTransfers(userId)
      setList(data)
    } finally {
      if (initial) setLoading(false)
    }
  }

  useEffect(() => { load(true) }, [userId])

  useEffect(() => {
    const id = setInterval(() => { load() }, 5000)
    return () => clearInterval(id)
  }, [userId])

  async function doAction(id: string, type: 'accept' | 'reject') {
    if (actionId) return
    setActionId(id)
    setError('')
    const fn = type === 'accept' ? acceptTransfer : rejectTransfer
    const res = await fn(id)
    if (res.error) {
      setError(res.error)
      setActionId(null)
      return
    }
    await load()
    setActionId(null)
    router.refresh()
  }

  if (loading) return null
  if (!list.length) return null

  return (
    <div className="w-full mt-12 bg-(--gray-0) p-4 flex flex-col gap-4 max-w-[640px]">
      {list.map(c => (
        <div key={c.id} className="flex flex-col sm:flex-row sm:items-center gap-4 bg-(--black) p-4 rounded">
          <div className="text-sm text-center sm:text-left sm:ml-2 sm:mr-auto">
            New request to receive <span className="font-bold">{c.name}</span> ({c.class})
          </div>
          <div className="flex gap-4">
            <button
              className="w-[50%] sm:w-auto text-xs cursor-pointer uppercase tracking-wide font-bold px-4 py-2 bg-(--primary-orange-1) duration-[.25s] hover:bg-(--primary-orange-2) disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={actionId === c.id}
              onClick={() => doAction(c.id,'accept')}
              type="button"
            >{actionId === c.id ? '...' : 'Accept'}</button>
            <button
              className="w-[50%] sm:w-auto text-xs cursor-pointer uppercase tracking-wide font-bold px-4 py-2 bg-(--gray-3) duration-[.25s] hover:bg-(--gray-2) disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={actionId === c.id}
              onClick={() => doAction(c.id,'reject')}
              type="button"
            >{actionId === c.id ? '...' : 'Decline'}</button>
          </div>
        </div>
      ))}
      {error && <p className="text-sm text-(--primary-red-1)">{error}</p>}
    </div>
  )
}
