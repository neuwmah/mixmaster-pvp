import React from 'react';

import { Character } from '@/types/character';

interface ResetPositionProps extends Character {
  resetPosition: boolean;
  setResetPosition: (value: boolean) => void;
}

export default function ResetPosition({ 
  resetPosition, 
  setResetPosition, 
  ...character 
}: ResetPositionProps) {
  return <>

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
}