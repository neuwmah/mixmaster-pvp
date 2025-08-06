import React from 'react';

import { Character } from '@/types/character';

interface ChangeNicknameProps extends Character {
  changeNickname: boolean;
  setChangeNickname: (value: boolean) => void;
}

export default function ChangeNickname({ 
  changeNickname, 
  setChangeNickname, 
  ...character 
}: ChangeNicknameProps) {
  return <>
  
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
}