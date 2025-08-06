"use client"
import React, { useState } from 'react';

import {
  ArrowUturnLeftIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

import { Character } from '@/types/character';

import Infos from './card/Infos';
import Edit from './card/Edit';
import ResetPosition from './card/_ResetPosition';
import TransferCharacter from './card/_TransferCharacter';
import ChangeNickname from './card/_ChangeNickname';

export default function Card(character: Character) {
  const [edit, setEdit] = useState(false);
  const [changeNickname, setChangeNickname] = useState(false)
  const [transferCharacter, setTransferCharacter] = useState(false)
  const [resetPosition, setResetPosition] = useState(false)
  
  return (
    <div key={character.id} className="info text-ellipsis overflow-hidden min-w-0 p-8 bg-(--black) relative min-h-[32rem]">
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
      <div className="absolute pointer-events-none p-8 top-0 right-0 z-1">
        <button className="pointer-events-auto cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1)" type="button"
          onClick={() => { setEdit(!edit) }} >
          {edit
            ? <ArrowUturnLeftIcon className="icon" />
            : <PencilSquareIcon className="icon" />
          }
        </button>
      </div>
    </div>
  );
}