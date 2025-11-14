import React from 'react';
import Link from 'next/link';

import { Menu } from '@/types/menu';

interface MenusDesktopProps {
  menus: Menu[];
}

const MenusDesktop: React.FC<MenusDesktopProps> = ({ menus }) => {
  return (
    <ul className="menus flex h-full gap-12 absolute top-[50%] left-[50%] translate-[-50%] whitespace-nowrap">
      {menus.map((item: Menu) => (
        <li key={item.id} className="menu flex items-center">
          <Link className={`link text-base duration-250 text-white hover:text-(--primary-orange-1)`} href={item.url}>
            <p>{item.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenusDesktop;