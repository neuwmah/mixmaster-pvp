"use client"
import React, { useState } from 'react';

import {
  ArrowUturnLeftIcon,
  DocumentArrowUpIcon,
  MapPinIcon,
  PencilIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

import { Character } from '@/types/character';

export default function Card(character: Character) {
  const [edit, setEdit] = useState(false);
  const [changeNickname, setChangeNickname] = useState(false)
  const [transferCharacter, setTransferCharacter] = useState(false)
  const [resetPosition, setResetPosition] = useState(false)
  
  return (
    <div key={character.id} className="info text-ellipsis overflow-hidden min-w-0 p-8 bg-(--black) relative min-h-[24rem]">
      <img 
        className="absolute top-0 left-0 object-cover w-full h-full opacity-[.7] filter-[brightness(.2)]"
        src={`/assets/images/characters/${character.class.toLocaleLowerCase()}.jpg`}
        alt={`char-${character.id}-${character.class}`}
      />
      <div className="relative z-1">
        {edit
          ? (changeNickname 
            ? <>
              <button
                className="cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1)"
                type="button"
                onClick={() => { setChangeNickname(!changeNickname) }}
              >
                Return
              </button>
              <p className="text-sm mt-8">
                New name
              </p>
            </>
            : transferCharacter
              ? <>
                <button
                  className="cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1)"
                  type="button"
                  onClick={() => { setTransferCharacter(!transferCharacter) }}
                >
                  Return
                </button>
                <p className="text-sm mt-8">
                  New user ID
                </p>
              </>
              : resetPosition
                ? <>
                  <button
                    className="cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1)"
                    type="button"
                    onClick={() => { setResetPosition(!resetPosition) }}
                  >
                    Return
                  </button>
                  <p className="text-sm mt-8">
                    Select a city to transfer
                  </p>
                </>
                : <>
                  <p className="text-sm">
                    Name: <strong>{character.name}</strong>
                  </p>
                  <button
                    className="flex items-center gap-4 mt-2 cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1)"
                    type="button"
                    onClick={() => { setChangeNickname(!changeNickname) }}
                  >
                    <PencilIcon className="icon max-w-6 max-h-6" /> Change nickname
                  </button>
                  <p className="text-sm mt-8">
                    Map: <strong>{character.map.charAt(0).toUpperCase() + character.map.slice(1).toLowerCase()}</strong>
                  </p>
                  <button
                    className="flex items-center gap-4 mt-2 cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1)"
                    type="button"
                    onClick={() => { setResetPosition(!resetPosition) }}
                  >
                    <MapPinIcon className="icon max-w-6 max-h-6" /> Reset position
                  </button>
                  <p className="text-sm mt-8">
                    User ID: <strong>{character.user.id}</strong>
                  </p>
                  <button
                    className="flex items-center gap-4 mt-2 cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1)"
                    type="button"
                    onClick={() => { setTransferCharacter(!transferCharacter) }}
                  >
                    <DocumentArrowUpIcon className="icon max-w-6 max-h-6" /> Transfer character
                  </button>
                </>
            )
          : <>
            <p>Created at: <strong>{new Date(character.created_at).toLocaleDateString()}</strong></p>
            <p>Name: <strong>{character.name}</strong></p>
            <p>Class: <strong>{character.class.charAt(0).toUpperCase() + character.class.slice(1).toLowerCase()}</strong></p>
            <p>Level: <strong>{character.level}</strong></p>
            <p>Map: <strong>{character.map.charAt(0).toUpperCase() + character.map.slice(1).toLowerCase()}</strong></p>
            <p>Status: <strong>{character.online_status ? 'Online' : 'Offline'}</strong></p>
            <p>Online time: <strong>{character.online_time}</strong></p>
            <p>Last connection: <strong>{new Date(character.last_connection_date).toLocaleDateString()}</strong></p>
            <p>Last connection IP: <strong>{character.last_connection_ip}</strong></p>
          </>
        }
      </div>
      <div className="absolute pointer-events-none p-8 top-0 right-0 z-1">
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
      </div>
    </div>
  );
}