import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  height?: number | `${number}` | undefined
  full?: boolean
}

const Logo: React.FC<LogoProps> = ({ height = 64, full = false }) => {
  return (
    <Link className="logo flex relative" href="/">
      <Image
        unoptimized
        src={`/assets/images/${full ? 'logo' : 'logo'}.png`}
        alt="logo"
        className={`object-contain h-[${height}px]`}
        height={height}
        width={height}
      />
    </Link>
  );
};

export default Logo;