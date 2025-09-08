"use client"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from 'next/navigation'

import { updateUser } from '@/app/api/user'
import { verifyCredentials } from '@/app/api/user'

import { PencilSquareIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

interface ChangeableFieldProps {
  userId: string
  username: string
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

export default function ChangeableField({ userId, username, field, cardsClass }: ChangeableFieldProps) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [editingStage, setEditingStage] = useState<0 | 1>(0)
  const [value, setValue] = useState(field.data || '')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [currentPwError, setCurrentPwError] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const valueInputRef = useRef<HTMLInputElement | null>(null)
  const pwInputRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!editing) setValue(field.data || '')
  }, [field.data, editing])

  useEffect(() => {
    if (!editing) return
    if (editingStage === 0 && valueInputRef.current) {
      valueInputRef.current.focus();
      valueInputRef.current.select();
    } else if (editingStage === 1 && pwInputRef.current) {
      pwInputRef.current.focus();
      pwInputRef.current.select();
    }
  }, [editing, editingStage])

  const cancel = useCallback(() => {
    if (sending || verifying) return
    setEditing(false)
    setEditingStage(0)
    setValue(field.data || '')
    setError('')
    setCurrentPassword('')
    setCurrentPwError(false)
  }, [field.data, sending, verifying])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        editing && 
        containerRef.current && 
        !containerRef.current.contains(e.target as Node)
      )
        cancel()
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editing, cancel])

  function validateField(): boolean {
    const backendKey = FIELD_MAP[field.key.toLowerCase()]
    if (!backendKey) return false
    const trimmed = value.trim()
    if (backendKey === 'email' && trimmed && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setError('invalid email');
      return false
    }
    if (backendKey === 'phone' && trimmed && trimmed.length < 1) {
      setError('invalid phone');
      return false
    }
    if (backendKey === 'password' && trimmed.length < 3) {
      setError('invalid password');
      return false
    }
    setError('')
    return true
  }

  async function proceed() {
    if (sending || verifying) return
    if (editingStage === 0) {
      if (!validateField()) return
      setEditingStage(1)
      return
    }
    if (!currentPassword) {
      setCurrentPwError(true)
      return
    }
    setVerifying(true)
    const creds = await verifyCredentials(username, currentPassword)
    setVerifying(false)
    if (!creds) {
      setCurrentPwError(true)
      return
    }
    setCurrentPwError(false)
    await submit()
  }

  async function submit() {
    if (sending) return
    const backendKey = FIELD_MAP[field.key.toLowerCase()]
    if (!backendKey) return
    const trimmed = value.trim()
    const payload: any = {}
    if (backendKey === 'phone') payload.phone = trimmed || ''
    else payload[backendKey] = trimmed
    payload.currentPassword = currentPassword
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
    setEditingStage(0)
    setCurrentPassword('')
    setCurrentPwError(false)
    router.refresh()
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') { e.preventDefault(); proceed() }
    else if (e.key === 'Escape') { e.preventDefault(); cancel() }
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
          setEditingStage(0);
          setError('');
          setCurrentPwError(false);
        }
      }}
    >
      <p>
        {field.key.toLocaleUpperCase()}
      </p>
      
      {editing ? (
        editingStage === 0 ? (
          <input
            className={`
              text-sm font-bold
              outline-none
              px-0 py-0
              w-auto
              min-w-[120px]
              border-none bg-transparent
              ${error ? 'text-(--primary-red-1)' : 'text-(--white)'}
            `}
            value={value}
            ref={valueInputRef}
            disabled={sending || verifying}
            type={isPassword ? 'password' : (isPhone ? 'text' : 'text')}
            placeholder={isPassword ? 'New password...' : 'Type here...'}
            onKeyDown={onKeyDown}
            onChange={e => { setValue(e.target.value); setError('') }}
          />
        ) : (
          <input
            className={`
              text-sm font-bold
              outline-none
              px-0 py-0
              w-auto
              min-w-[120px]
              border-none bg-transparent
              ${currentPwError ? 'text-(--primary-red-1)' : 'text-(--white)'}
            `}
            value={currentPassword}
            ref={pwInputRef}
            disabled={sending || verifying}
            type="password"
            placeholder="Current password..."
            onKeyDown={onKeyDown}
            onChange={e => { setCurrentPassword(e.target.value); setCurrentPwError(false) }}
          />
        )
      ) : (
        <strong>
          {masked}
        </strong>
      )}
      
      {(sending || verifying) ? (
        <div
          className={`
            icon
            loader
            flex w-auto h-auto
            absolute right-8 top-[50%] translate-y-[-50%]
            text-(--white) fill-(--white)
          `}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle className="spinner_b2T7" cx="4" cy="12" r="3"/>
            <circle className="spinner_b2T7 spinner_YRVV" cx="12" cy="12" r="3"/>
            <circle className="spinner_b2T7 spinner_c9oY" cx="20" cy="12" r="3"/>
          </svg>
        </div>
      ) : (
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
          disabled={sending || verifying}
          aria-label={editing ? (editingStage === 0 ? 'Continuar' : 'Confirmar') : 'Editar'}
          onClick={(e) => {
            e.stopPropagation();
            if (editing) {
              void proceed();
            } else {
              setEditing(true);
              setEditingStage(0);
            }
          }}
        >
          {editing
            ? <CheckCircleIcon className="min-h-[2.8rem] min-w-[2.8rem]" />
            : <PencilSquareIcon className="min-h-[2.4rem] min-w-[2.4rem] translate-x-[-.2rem]" />
          }
        </button>
      )}
    </div>
  )
}