"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { updateChangelogField } from '@/app/api/changelog'

interface Props {
  postId: string
  postActive?: boolean | null | undefined
  className?: string
  children?: React.ReactNode
  postSetActive: (value: boolean) => void
}

export default function ButtonActive({ postId, postActive, className = '', children, postSetActive }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    if (loading) return
    if (!postId) return
    setError(null)
    setLoading(true)
    try {
      const ok = await updateChangelogField(postId, { active: !postActive })
      setLoading(false)
      if (!ok) {
        setError('handleClick updateChangelogField error')
        return
      }
      postSetActive(!postActive)
      router.refresh()
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
        title={postActive ? 'Deactive post' : 'Active post'}
      >
        {children}
      </button>
      {error && <span className="block mt-2 text-xs text-red-400">{error}</span>}
    </>
  )
}
