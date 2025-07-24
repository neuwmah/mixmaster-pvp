"use client"
import React, { useEffect, useState } from 'react';

import { Menu } from '@/types/menu';
import { checkMobile } from '@/hooks/mobile';

import MenusMobile from './menus/MenusMobile';
import MenusDesktop from './menus/MenusDesktop';
import Actions from './header/Actions';

interface MenusProps {
  menus: Menu[];
}

const Menus: React.FC<MenusProps> = ({ menus }) => {
  const [menuMobile, setMenuMobile] = useState(false);
  const mobile = checkMobile();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <>
      {mounted && (mobile
        ? <MenusMobile menus={menus} menuMobile={menuMobile} setMenuMobile={setMenuMobile} />
        : <MenusDesktop menus={menus} />
      )}
      <Actions setMenuMobile={setMenuMobile} />
    </>
  )
};

export default Menus;