import React from 'react';

import { useRouter } from 'next/navigation'

import { deleteCharacter } from '@/app/api/character'

import {
  ArrowUturnLeftIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

import { Character } from '@/types/character';

interface ActionsProps {
  character: Character
  hoveredId?: string | null
  edit: boolean
  deleting: boolean
  setEdit: (value: boolean) => void
  setDeleting: (value: boolean) => void
  setPetsList: (value: Character | undefined) => void
  setItems: (value: Character | undefined) => void
}

export default function Actions({
  character,
  hoveredId,
  edit,
  deleting,
  setEdit,
  setDeleting,
  setPetsList,
  setItems
}: ActionsProps) {
  const router = useRouter()
  
  let opacityClass = 'opacity-100'
  if (hoveredId)
    opacityClass = hoveredId === character.id
      ? 'opacity-100'
      : 'opacity-0'

  async function removeCharacter() {
    if (character.transferPending) return
    if (deleting) return
    if (!window.confirm('Are you sure?')) return
    setDeleting(true)
    
    const { ok, error } = await deleteCharacter(character.id)
    if (!ok) {
      alert(error || 'Error deleting character.')
      setDeleting(false)
      return
    }
    
    router.refresh()
  }

  return (
    <div className={`
      actions absolute pointer-events-none p-8 top-0 right-0 z-1 flex flex-col gap-8 h-full
      ${opacityClass}
      duration-[.25s]  
    `}>
      {/* <button
        className="group relative pointer-events-auto cursor-pointer duration-[.25s] hover:text-(--primary-orange-1)"
        type="button"
        onClick={() => setEdit(!edit)}
      >
        <span className="text-sm text-white pointer-events-none absolute right-[calc(100%+.8rem)] top-[50%] translate-y-[-50%] opacity-0 duration-[.25s] group-hover:opacity-100">
          {edit ? 'Return' : 'Edit'}
        </span>
        {edit
          ? <ArrowUturnLeftIcon className="icon" />
          : <PencilSquareIcon className="icon" />
        }
      </button> */}
      
      <button
        className="text-[2rem] group relative pointer-events-auto cursor-pointer duration-[.25s] hover:text-(--primary-orange-1)"
        type="button"
        onClick={() => { setPetsList(character) }}
      >
        <span className="text-sm text-white pointer-events-none absolute right-[calc(100%+.8rem)] top-[50%] translate-y-[-50%] opacity-0 duration-[.25s] group-hover:opacity-100">
          Pets
        </span>
        🐍
      </button>
      
      <button
        className="text-[2rem] group relative pointer-events-auto cursor-pointer duration-[.25s] hover:text-(--primary-orange-1)"
        type="button"
        onClick={() => { setItems(character) }}
      >
        <span className="text-sm text-white pointer-events-none absolute right-[calc(100%+.8rem)] top-[50%] translate-y-[-50%] opacity-0 duration-[.25s] group-hover:opacity-100">
          Items
        </span>
        🛡️
      </button>
      
      <button
        className="group relative pointer-events-auto cursor-pointer duration-[.25s] hover:text-(--primary-orange-1) disabled:opacity-40 disabled:cursor-not-allowed flex justify-center"
        type="button"
        onClick={removeCharacter}
        disabled={deleting || !!character.transferPending}
      >
        <span className="text-sm text-white pointer-events-none absolute right-[calc(100%+.8rem)] top-[50%] translate-y-[-50%] opacity-0 duration-[.25s] group-hover:opacity-100">
          Remove
        </span>
        {deleting ? '...' : <TrashIcon className="icon" />}
      </button>
    </div>
  )
}