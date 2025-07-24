import React from 'react';

import { getMenus } from '@/api/menus';

import Logo from '@/components/header/Logo';
import Menus from '@/components/Menus';

const Header: React.FC = async () => {
  const menusData = await getMenus();

  return (
    <header className="header sticky bg-black w-full top-0 z-30 h-[80px] border-b-1 border-(--gray-1)">
      <nav className="container justify-between relative h-full">
        <div className="logo-mm my-auto">
          <Logo />
        </div>
        <Menus menus={menusData} />
      </nav>
    </header>
  )
};

export default Header;