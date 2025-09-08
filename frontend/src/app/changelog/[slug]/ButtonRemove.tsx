"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { deleteChangelog } from '@/app/api/changelog'

interface Props {
  postId: string
  className?: string
  children?: React.ReactNode
}

export default function ButtonRemove({ postId, className = '', children }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    if (loading) return
    if (!postId) return
    if (!confirm('Are you sure?')) return
    setError(null)
    setLoading(true)
    try {
      const ok = await deleteChangelog(postId)
      if (!ok) {
        setError('handleClick deleteChangelog error')
        setLoading(false)
        return
      }
      router.push('/account')
    } catch (e) {
      setError('unexpected error')
      setLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={className + (loading ? ' pointer-events-none' : '')}
        title="Remove post"
      >
        {children}
      </button>
      {error && <span className="block mt-2 text-xs text-red-400">{error}</span>}
    </>
  )
}
