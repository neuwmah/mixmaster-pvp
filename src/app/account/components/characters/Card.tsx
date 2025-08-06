"use client"
import React, { useState } from 'react';

import {
  ArrowUturnLeftIcon,
  DocumentArrowUpIcon,
  PencilIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

import { Character } from '@/types/character';

export default function Card(character: Character) {
  const [edit, setEdit] = useState(false);
  
  return (
    <div key={character.id} className="info text-ellipsis overflow-hidden min-w-0 p-8 bg-(--black) relative">
      <img 
        className="absolute top-0 left-0 object-cover w-full h-full opacity-[.7] filter-[brightness(.2)]"
        src={`/assets/images/characters/${character.class.toLocaleLowerCase()}.jpg`}
        alt={`char-${character.id}-${character.class}`}
      />
      <div className="relative z-1">
        {edit
          ? <>
            <p className="text-sm">Name: <strong>{character.name}</strong></p>
            <button
              className="flex items-center gap-4 mt-2 pointer-events-auto cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1)"
              type="button"
            >
              <PencilIcon className="icon max-w-6 max-h-6" /> Change nickname
            </button>
            <p className="text-sm mt-6">User: <strong>{character.user.id}</strong></p>
            <button
              className="flex items-center gap-4 mt-2 pointer-events-auto cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1)"
              type="button"
            >
              <DocumentArrowUpIcon className="icon max-w-6 max-h-6" /> Transfer character
            </button>
          </>
          : <>
            <p>Created at: <strong>{new Date(character.created_at).toLocaleDateString()}</strong></p>
            <p>Name: <strong>{character.name}</strong></p>
            <p>Class: <strong>{character.class.charAt(0).toUpperCase() + character.class.slice(1).toLowerCase()}</strong></p>
            <p>Level: <strong>{character.level}</strong></p>
            <p>Map: <strong>{character.map.charAt(0).toUpperCase() + character.map.slice(1).toLowerCase()}</strong></p>
            <p>Exp: <strong>{character.exp}</strong></p>
            <p>Gold: <strong>{character.gold}</strong></p>
            <p>Energy: <strong>{character.attributes.energy}</strong></p>
            <p>Agility: <strong>{character.attributes.agility}</strong></p>
            <p>Accuracy: <strong>{character.attributes.accuracy}</strong></p>
            <p>Luck: <strong>{character.attributes.luck}</strong></p>
            <p>Status: <strong>{character.online_status ? 'Online' : 'Offline'}</strong></p>
            <p>Online time: <strong>{character.online_time}</strong></p>
            <p>Last connection date: <strong>{new Date(character.last_connection_date).toLocaleDateString()}</strong></p>
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