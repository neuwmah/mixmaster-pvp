"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { updateChangelogField } from '@/app/api/changelog'

interface Props {
  postId: string
  postSlug?: string
  className?: string
  children?: React.ReactNode
  postSetSlug: (value: string) => void
}

export default function ButtonSlug({ postId, postSlug, className = '', children, postSetSlug }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)

  async function handleClick() {
    if (loading) return
    if (!editing) {
      setEditing(true)
      return
    }
    const nextSlug = (postSlug ?? '').trim()
    if (!postId || !nextSlug) return
    setError(null)
    setLoading(true)
    try {
      const ok = await updateChangelogField(postId, { slug: nextSlug })
      if (!ok) {
        setError('slug already in use!')
        router.refresh()
        return
      }
      setEditing(false)
      router.replace(`/changelog/${nextSlug}`)
      router.refresh()
    } catch (e) {
      console.log(e)
      setError('')
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={"slug relative flex z-1"}>
      <div className={`
        flex items-center whitespace-nowrap
        w-[24rem] px-[.8rem] py-[.4rem]
        rounded-[.4rem] border-1px border-(--gray-1)
        absolute left-[calc(100%+.8rem)] translate-y-[-50%] top-[50%]
        bg-(--black) hover:bg-(--gray-0) active:bg-(--gray-0) focus-within:bg-(--gray-0)
        duration-[.25s]
        ${editing ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <label
          className="
            text-sm text-(--gray-3)
            cursor-text select-none
            pr-[.4rem]
          "
          htmlFor="slug"
        >
          changelog/
        </label>
        <input
          id="slug"
          className="
            text-sm
            min-w-0 w-full
            bg-transparent outline-none border-none 
            placeholder-(--white)
            overflow-ellipsis
          "
          type="text"
          name="slug"
          minLength={1}
          value={postSlug ?? ''}
          onChange={(e) => {
            setError(null)
            postSetSlug(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleClick()
            }
            if (e.key === 'Escape') {
              e.preventDefault()
              setEditing(false)
            }
          }}
          placeholder={postSlug}
          aria-label="Post slug"
        />
      </div>

      <button
        type="button"
        onClick={() => { setEditing(!editing) }}
        disabled={loading}
        className={className + (loading ? ' pointer-events-none' : '')}
        title={'Edit slug'}
      >
        {children}
      </button>

      {error && 
        <span className="
          text-xs text-red-400
          whitespace-nowrap
          absolute left-[calc(100%+.8rem)] top-[50%] translate-y-[-50%]
        ">
          {error}
        </span>
      }
    </div>
  )
}
