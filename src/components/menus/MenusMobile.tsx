"use client"
import React from 'react';
import Link from 'next/link';

import { Menu } from '@/types/menu';

import Logo from '@/components/header/Logo';

interface MenusMobileProps {
  menus: Menu[];
  menuMobile: boolean;
  setMenuMobile: (value: boolean) => void;
}

const MenusMobile: React.FC<MenusMobileProps> = ({ menus, menuMobile, setMenuMobile }) => {
  return (
    <div className={`menu-mobile flex h-full gap-12 fixed top-0 left-0 w-full group ${menuMobile ? '-active pointer-events-auto' : 'pointer-events-none'}`}>
      <ul className="menu-body bg-black w-full max-w-lg duration-400 -translate-x-full border-r-1 border-r-(--gray-0) z-1 group-[.-active]:translate-x-0 transition-transform">
        <div className="menu-header flex items-center h-[80px] px-[5vw]" onClick={() => { setMenuMobile(false) }}>
          <Logo />
        </div>

        {menus.map((item: Menu) => (
          <li className="menu-link flex" key={item.id}>
            <Link 
              className="link flex items-center w-full text-base text-white px-[5vw] h-[64px] bg-(--gray-0) border-t-1 border-t-(--gray-1)" 
              onClick={() => { setMenuMobile(false) }}
              href={item.url}
            >
              <p>{item.title}</p>
            </Link>
          </li>
        ))}
        <li className="menu-link flex">
          <Link 
            className="link flex items-center w-full text-base text-white px-[5vw] h-[64px] border-t-1 border-t-(--gray-1)" 
            onClick={() => { setMenuMobile(false) }}
            href="/account"
          >
            <p>Account 👤</p>
          </Link>
        </li>
      </ul>

      <div
        className="menu-overlay absolute top-0 left-0 w-full h-full duration-400 bg-[rgba(0,0,0,.7)] opacity-0 group-[.-active]:opacity-100"
        onClick={() => { setMenuMobile(false) }}
      ></div>
    </div>
  );
};

export default MenusMobile;