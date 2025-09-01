"use client"
import React from 'react';

import { checkMobile } from '@/hooks/checkMobile';

interface BackgroundMixProps {
  char1?: string | boolean;
  char2?: string | boolean;
}

const BackgroundMix: React.FC<BackgroundMixProps> = ({ char1 = false, char2 = false }) => {
  const mobile = checkMobile();

  return char1 || char2 ? (
    <div className={`
      background-mix 
      pointer-events-none
      h-full w-full max-w-[1920px]
      mix-blend-darken brightness-[.15]
      absolute top-0 left-[50%] translate-x-[-50%]
      z-${mobile ? 0 : 1}
    `}>
      {char1 &&
        <img
          src={`/assets/images/characters/${char1}.jpg`}
          alt="logo"
          className={`object-${mobile ? 'cover' : 'contain'} absolute bottom-0 left-0 w-full h-[100%] max-w-[480px] max-h-[480px] blur-[4px]`}
        />
      }
      {char2 && !mobile &&
        <img
          src={`/assets/images/characters/${char2}.jpg`}
          alt="logo"
          className="object-contain absolute bottom-0 right-0 h-[100%] max-w-[480px] max-h-[480px] blur-[4px]"
        />
      }
    </div>
  ) : ``
};

export default BackgroundMix;