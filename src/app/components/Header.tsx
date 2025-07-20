"use client"
import React, { useState, useEffect } from 'react';

import { useMobile } from '../hooks/checkMobile';

import Logo from './header/Logo';
import Menus from './header/Menus';
import Actions from './header/Actions';
import MenuMobile from './header/MenuMobile';

const Header: React.FC = () => {
  const [menuMobile, setMenuMobile] = useState(false);
  const mobile = useMobile();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="header sticky bg-black w-full top-0 z-30 h-[80px] border-b-1 border-(--gray-1)">
      <nav className="container justify-between relative h-full">
        <div className="logo-mm my-auto">
          <Logo />
        </div>
        {mounted && (mobile 
          ? <MenuMobile active={menuMobile} closeMenuMobile={() => setMenuMobile(false)} /> 
          : <Menus />
        )}
        <Actions openMenuMobile={() => setMenuMobile(true)} />
      </nav>
    </header>
  );
};

export default Header;