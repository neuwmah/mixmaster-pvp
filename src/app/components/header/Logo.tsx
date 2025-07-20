import React from 'react';
import Link from 'next/link';

interface LogoProps {
  height?: number | string;
}

const Logo: React.FC<LogoProps> = ({ height = 64 }) => {
  return (
    <Link className="logo" href="/">
      <img
        src="https://web.playmixmaster.com/src/img/nav-logo.webp"
        alt="logo"
        className={`object-contain h-[${height}px]`}
        height={height}
        width={height}
      />
    </Link>
  );
};

export default Logo;