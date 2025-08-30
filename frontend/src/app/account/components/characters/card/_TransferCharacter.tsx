import React from 'react';

import { Character } from '@/types/character';

interface TransferCharacterProps extends Character {
  transferCharacter: boolean;
  setTransferCharacter: (value: boolean) => void;
}

export default function TransferCharacter({ 
  transferCharacter, 
  setTransferCharacter, 
  ...character 
}: TransferCharacterProps) {
  return <>
  
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
}