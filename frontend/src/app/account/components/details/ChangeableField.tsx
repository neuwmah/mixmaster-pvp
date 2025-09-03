"use client"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from 'next/navigation'

import { updateUser } from '@/app/api/user'

import { PencilSquareIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

interface ChangeableFieldProps {
  userId: string
  field: {
    key: string;
    data: string | null;
  }
  cardsClass: string;
}

const FIELD_MAP: Record<string, 'email' | 'password' | 'phone' | undefined> = {
  'e-mail': 'email',
  'password': 'password',
  'phone': 'phone'
}

export default function ChangeableField({ userId, field, cardsClass }: ChangeableFieldProps) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(field.data || '')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!editing) setValue(field.data || '')
  }, [field.data, editing])

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const cancel = useCallback(() => {
    if (sending) return
    setEditing(false)
    setValue(field.data || '')
    setError('')
  }, [field.data, sending])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (editing && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        cancel()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editing, cancel])

  async function submit() {
    if (sending) return
    const backendKey = FIELD_MAP[field.key.toLowerCase()]
    if (!backendKey) return
    const trimmed = value.trim()

    if (backendKey === 'email' && trimmed && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setError('Email inválido')
      return
    }
    if (backendKey === 'phone' && trimmed && trimmed.length < 6) {
      setError('Telefone muito curto')
      return
    }
    if (backendKey === 'password' && trimmed.length < 3) {
      setError('Senha deve ter 3+ caracteres')
      return
    }

    const payload: any = {}
    if (backendKey === 'phone') payload.phone = trimmed || ''
    else payload[backendKey] = trimmed

    setSending(true)
    const res = await updateUser(userId, payload)
    setSending(false)
    if (res.error) {
      setError(res.error)
      setTimeout(() => setError(''), 3000)
      return
    }
    setError('')
    setEditing(false)
    router.refresh()
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault(); submit()
    } else if (e.key === 'Escape') {
      e.preventDefault(); cancel()
    }
  }

  const isPassword = field.key.toLowerCase() === 'password'
  const isPhone = field.key.toLowerCase() === 'phone'
  const masked =
    isPassword 
      ? '********' 
      : (field.data 
        ? field.data 
        : '****'
      )

  return (
    <div
      ref={containerRef}
      className={`
        ${cardsClass}
        changeable group
        duration-[.25s] hover:border-(--white)
        ${editing 
          ? 'border-(--white)' 
          : 'cursor-pointer'
        }
      `}
      onClick={() => {
        if (!editing) {
          setEditing(true);
          setError('');
        }
      }}
    >
      <p>
        {field.key.toLocaleUpperCase()}
      </p>
      
      {editing ? (
        <input
          className={`
            text-sm font-bold
            outline-none
            px-0 py-0
            w-auto min-w-[120px]
            border-none bg-transparent
            ${error
              ? 'text-(--primary-red-1)'
              : 'text-(--white)'
            }
          `}
          value={value}
          ref={inputRef}
          disabled={sending}
          type={isPassword ? 'password' : (isPhone ? 'text' : 'text')}
          placeholder={isPassword ? 'New password...' : 'Type here...'}
          onChange={e => { setValue(e.target.value); setError('') }}
          onKeyDown={onKeyDown}
        />
      ) : (
        <strong>
          {masked}
        </strong>
      )}
      
      <button
        type="button"
        className={`
          icon
          cursor-pointer
          flex w-auto h-auto
          absolute right-8 top-[50%] translate-y-[-50%]
          text-(--white)
          opacity-40 transition-[.25s]
          ${editing
            ? 'hover:opacity-100 min-w-[2.8rem] min-h-[2.8rem]'
            : 'group-hover:opacity-100'
          }
        `}
        disabled={sending}
        aria-label={editing ? 'Confirmar' : 'Editar'}
        onClick={(e) => {
          e.stopPropagation();
          editing ? submit() : setEditing(true);
        }}
      >
        {editing
          ? <CheckCircleIcon className="min-h-[2.8rem] min-w-[2.8rem]" />
          : <PencilSquareIcon className="min-h-[2.4rem] min-w-[2.4rem]" />
        }
      </button>
    </div>
  )
}