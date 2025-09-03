import React from 'react';

import {
  DocumentArrowUpIcon,
  MapPinIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

import { Character } from '@/types/character';

interface EditProps extends Character {
  changeNickname: boolean;
  setChangeNickname: (value: boolean) => void;
  resetPosition: boolean;
  setResetPosition: (value: boolean) => void;
  transferCharacter: boolean;
  setTransferCharacter: (value: boolean) => void;
}

export default function Edit({ 
  changeNickname, 
  setChangeNickname, 
  resetPosition, 
  setResetPosition, 
  transferCharacter, 
  setTransferCharacter, 
  ...character 
}: EditProps) {
  return <>

    <p className="text-sm">
      Name: <strong>{character.name}</strong>
    </p>

    <button
      className="flex items-center gap-2 mt-2 cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1)"
      type="button"
      onClick={() => { setChangeNickname(!changeNickname) }}
    >
      <PencilIcon className="icon max-w-6 max-h-6" />
      Change nickname
    </button>

    <p className="text-sm mt-8">
      Map: <strong>{character.map.charAt(0).toUpperCase() + character.map.slice(1).toLowerCase()}</strong>
    </p>

    <button
      className="flex items-center gap-2 mt-2 cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1)"
      type="button"
      onClick={() => { setResetPosition(!resetPosition) }}
    >
      <MapPinIcon className="icon max-w-6 max-h-6" />
      Reset position
    </button>

    <p className="text-sm mt-8">
      User ID: <strong>{character.user?.id || character.userId || '—'}</strong>
    </p>

    <button
      className="flex items-center gap-2 mt-2 cursor-pointer underline duration-[.25s] hover:text-(--primary-orange-1)"
      type="button"
      onClick={() => { setTransferCharacter(!transferCharacter) }}
    >
      <DocumentArrowUpIcon className="icon max-w-6 max-h-6" />
      Transfer character
    </button>

  </>
}