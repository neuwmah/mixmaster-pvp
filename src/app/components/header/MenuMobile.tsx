import React from 'react';
import Link from 'next/link';

import Logo from './Logo';

const menusData = [
  { id: 1, title: 'Download 💻', url: '/download' },
  { id: 2, title: 'How to Play 🎮', url: '/how-to-play' },
  { id: 3, title: 'Ranking ⭐', url: '/ranking' },
  { id: 4, title: 'Siege Affair 🏰', url: '/siege-affair' },
  { id: 5, title: 'Store ❔', url: '/shop' },
];

const MenuMobile: React.FC<{ active?: boolean; closeMenuMobile?: () => void }> = ({ active, closeMenuMobile }) => {
  return (
    <div className={`menu-mobile flex h-full gap-12 fixed top-0 left-0 w-full h-full pointer-events-none group [.-active]:pointer-events-auto ${active ? '-active pointer-events-auto' : ''}`}>
      
      <ul className="menu-body bg-black w-full max-w-lg duration-400 -translate-x-full border-r-1 border-r-(--gray-0) z-1 group-[.-active]:translate-x-0 transition-transform">
        <div className="menu-header flex items-center h-[80px] px-[5vw]" onClick={closeMenuMobile}>
          <Logo />
        </div>

        {menusData.map(item => (
          <li className="menu-link flex" key={item.id}>
            <Link 
              className="link flex items-center w-full text-base text-white px-[5vw] h-[64px] bg-(--gray-0) border-t-1 border-t-(--gray-1)" 
              onClick={closeMenuMobile}
              href={item.url}
            >
              <p>{item.title}</p>
            </Link>
          </li>
        ))}
        <li className="menu-link flex">
          <Link 
            className="link flex items-center w-full text-base text-white px-[5vw] h-[64px] border-t-1 border-t-(--gray-1)" 
            onClick={closeMenuMobile}
            href="/account"
          >
            <p>Account 👤</p>
          </Link>
        </li>
      </ul>

      <div
        className="menu-overlay absolute top-0 left-0 w-full h-full duration-400 bg-[rgba(0,0,0,.7)] opacity-0 group-[.-active]:opacity-100"
        onClick={closeMenuMobile}
      ></div>

    </div>
  );
};

export default MenuMobile;