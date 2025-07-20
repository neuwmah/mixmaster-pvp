import React from 'react';
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link className="logo my-auto" href="/">
      <img
        src="https://web.playmixmaster.com/src/img/nav-logo.webp"
        alt="logo"
        className="h-24"
      />
    </Link>
  );
};

export default Logo;