import React from 'react';
import Link from 'next/link';

interface LogoProps {
  height?: number | string;
  full?: boolean;
}

const Logo: React.FC<LogoProps> = ({ height = 28, full = false }) => {
  return (
    <Link className="logo flex relative" href="/">
      <img
        src={`/assets/images/${full ? 'logo' : 'logo-icon'}.png`}
        alt="logo"
        className={`object-contain h-[${height}px]`}
        height={height}
        width={height}
      />
      {!full && 
        <p className="text-base absolute text-nowrap pl-6 left-[100%] top-[50%] translate-y-[-50%]">
          MixMaster PVP
        </p>
      }
    </Link>
  );
};

export default Logo;