import React from 'react';
import Link from 'next/link';

const menusData = [
  { id: 1, title: 'Download 💻', url: '/download' },
  { id: 2, title: 'How to Play 🎮', url: '/how-to-play' },
  { id: 3, title: 'Ranking ⭐', url: '/ranking' },
  { id: 4, title: 'Siege Affair 🏰', url: '/siege-affair' },
  { id: 5, title: 'Store ❔', url: '/shop' },
];

const Menus: React.FC = () => {
  return (
    <ul className="menus flex h-full gap-12 absolute top-[50%] left-[50%] translate-[-50%]">
      {menusData.map(item => (
        <li key={item.id} className="menu flex items-center">
          <Link className="text-base link duration-250 text-white hover:text-(--personal)" href={item.url}>
            <p>{item.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Menus;