"use client"
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  postId: string
  imageSrc?: string | null
  isAdmin: boolean
  className?: string
}

function resolveSrc(src: string | null | undefined) {
  if (!src) return null
  if (src.startsWith('/uploads/')) {
    const base = (process.env.NEXT_PUBLIC_BACKEND_API_URL || '').replace(/\/$/, '')
    return base + src
  }
  return src
}

export default function EditableImage({ postId, imageSrc, isAdmin }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(resolveSrc(imageSrc) || null)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  if (!isAdmin) {
    if (!imageSrc) return null
    return <img className="w-full mt-6 aspect-[2/1] object-cover" src={resolveSrc(imageSrc) || undefined} alt="Imagem" />
  }

  function openPicker() {
    if (inputRef.current) inputRef.current.click()
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return
    setUploading(true)
    try {
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
      const form = new FormData()
      form.append('file', file)
      const res = await fetch(`/api/changelog/${postId}/image`, { method: 'POST', body: form })
      if (res.ok) {
        const json = await res.json()
        if (json?.image_src) setPreview(resolveSrc(json.image_src))
      } else {
        console.error('upload failed', await res.text())
      }
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
      router.refresh()
    }
  }

  return (
    <div className={`group relative w-full ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>      
      {preview ? (
        <img
          className={`cursor-pointer w-full mt-6 aspect-[2/1] object-cover`}
          alt="Imagem do changelog"
          src={preview}
          onClick={openPicker}
        />
      ) : (
        <div
          className="text-base text-(--gray-4) mt-6 w-full aspect-video flex items-center justify-center cursor-pointer border border-dashed border-(--gray-6)"
          onClick={openPicker}
        >
          Adicionar imagem
        </div>
      )}
      <span className="text-base absolute top-[50%] translate-y-[-50%] right-[calc(100%+1.6rem)] opacity-0 duration-[.25s] group-hover:opacity-100">
        📷
      </span>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  )
}
