"use client"
import React, { useState } from 'react';

import {
  ArrowUturnLeftIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

import Infos from '@/app/account/components/characters/card/Infos';
import Edit from '@/app/account/components/characters/card/Edit';
import ResetPosition from '@/app/account/components/characters/card/_ResetPosition';
import TransferCharacter from '@/app/account/components/characters/card/_TransferCharacter';
import ChangeNickname from '@/app/account/components/characters/card/_ChangeNickname';

import { useRouter } from 'next/navigation';
import { deleteCharacter } from '@/app/api/character';

import { Character } from '@/types/character';

export default function Card(character: Character) {
  const [edit, setEdit] = useState(false);
  const [changeNickname, setChangeNickname] = useState(false)
  const [transferCharacter, setTransferCharacter] = useState(false)
  const [resetPosition, setResetPosition] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  async function removeCharacter() {
    if (deleting) return;
    const okConfirm = window.confirm(`Are you sure?`);
    if (!okConfirm) return;
    setDeleting(true);
    const ok = await deleteCharacter(character.id);
    if (!ok) {
      alert('Error deleting character.');
      return;
    }
    setDeleting(false);
    router.refresh();
  }

  return (
    <div className="info text-ellipsis overflow-hidden min-w-0 p-8 bg-(--black) relative min-h-[32rem] sm:w-[calc(33.333%-1.0666rem)]">
      
      <img 
        className="absolute top-0 left-0 object-cover w-full h-full opacity-[.7] filter-[brightness(.2)]"
        src={`/assets/images/characters/${character.class.toLocaleLowerCase()}.jpg`}
        alt={`char-${character.id}-${character.class}`}
      />

      <div className="relative z-1">
        {edit
          ? (changeNickname 
            ? <ChangeNickname {...character} changeNickname={changeNickname} setChangeNickname={setChangeNickname} />
            : transferCharacter
              ? <TransferCharacter {...character} transferCharacter={transferCharacter} setTransferCharacter={setTransferCharacter} />
              : resetPosition
                ? <ResetPosition {...character} resetPosition={resetPosition} setResetPosition={setResetPosition} />
                : <Edit 
                  {...character}
                  changeNickname={changeNickname}
                  setChangeNickname={setChangeNickname}
                  resetPosition={resetPosition}
                  setResetPosition={setResetPosition}
                  transferCharacter={transferCharacter}
                  setTransferCharacter={setTransferCharacter}
                />
            )
          : <Infos {...character} />
        }
      </div>

      <div className="absolute pointer-events-none p-8 top-0 right-0 z-1 flex flex-col gap-8">
        <button
          className="pointer-events-auto cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1)"
          type="button"
          onClick={() => { setEdit(!edit) }}
        >
          {edit
            ? <ArrowUturnLeftIcon className="icon" />
            : <PencilSquareIcon className="icon" />
          }
        </button>

        <button
          className="pointer-events-auto cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1) disabled:opacity-40 disabled:cursor-not-allowed"
          type="button"
          onClick={removeCharacter}
          disabled={deleting}
        >
          <TrashIcon className="icon" />
        </button>
      </div>

    </div>
  )
}