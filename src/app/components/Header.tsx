"use client"
import React from 'react';

import { useMobile } from '../hooks/checkMobile';

import Logo from './header/Logo';
import Menus from './header/Menus';
import Actions from './header/Actions';

const Header: React.FC = () => {
  const mobile = useMobile();

  return (
    <header className="header sticky bg-black w-full h-80 top-0 z-30">
      <nav className="container justify-between relative h-full">
        <Logo />
        {!mobile && <Menus />}
        <Actions />
      </nav>
    </header>
  );
};

export default Header;