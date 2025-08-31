import React from 'react';
import Link from 'next/link';

interface LogoProps {
  height?: number | string;
  full?: boolean;
}

const Logo: React.FC<LogoProps> = ({ height = 64, full = false }) => {
  return (
    <Link className="logo flex relative" href="/">
      <img
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