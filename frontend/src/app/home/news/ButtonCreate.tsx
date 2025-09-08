"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { createChangelog } from '@/app/api/changelog'

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function ButtonCreate({ className = '', children }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    if (loading) return
    setError(null)
    setLoading(true)
    try {
      const timestamp = Date.now()
      const slug = `untitled-post-${timestamp}`
      const newItem = await createChangelog({
        slug,
        title: 'Untitled Post',
        image_src: '/assets/images/devnotes.webp',
        content1: 'Text before the image.',
        content2: 'Text after the image.'
      })
      if (!newItem) {
        setError('handleClick createChangelog error')
        setLoading(false)
        return
      }
      router.push(`/changelog/${newItem.slug}`)
    } catch (e) {
      console.log(e)
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
      >
        {children}
      </button>
      {error && <span className="block mt-2 text-xs text-red-400">{error}</span>}
    </>
  )
}
