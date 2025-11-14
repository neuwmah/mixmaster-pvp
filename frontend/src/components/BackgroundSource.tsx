"use client"
import React from 'react';
import Image from 'next/image';

import { checkMobile } from '@/hooks/checkMobile';

const BackgroundSource: React.FC = () => {
  const mobile = checkMobile();

  return (
    <div className={`
      background-source 
      pointer-events-none
      h-full w-full
      brightness-[.0666] scale-[1.2] saturate-0
      fixed top-0 left-0
      overflow-hidden
    `}>
      <Image
        unoptimized
        src={`/assets/images/dog.png`}
        alt={`dog.png`}
        width={500}
        height={500}
        className={`object-cover absolute bottom-[-80px] left-0 w-full h-full blur-[4px]`}
      />
    </div>
  )
};

export default BackgroundSource;