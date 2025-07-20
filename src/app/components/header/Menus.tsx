import React from 'react';
import Link from 'next/link';

const Menus: React.FC = () => {
  return (
    <ul className="menus flex h-full gap-12 absolute top-[50%] left-[50%] translate-[-50%]">
      <li className="menu flex items-center">
        <Link className="link duration-250 text-white hover:text-(--personal)" href="/download">
          <p>
            Download 💻
          </p>
        </Link>
      </li>
      <li className="menu flex items-center">
        <Link className="link duration-250 text-white hover:text-(--personal)" href="/how-to-play">
          <p>
            How to Play 🎮
          </p>
        </Link>
      </li>
      <li className="menu flex items-center">
        <Link className="link duration-250 text-white hover:text-(--personal)" href="/ranking">
          <p>
            Ranking ⭐
          </p>
        </Link>
      </li>
      <li className="menu flex items-center">
        <Link className="link duration-250 text-white hover:text-(--personal)" href="/siege-affair">
          <p>
            Siege Affair 🔪
          </p>
        </Link>
      </li>
      <li className="menu flex items-center">
        <Link className="link duration-250 text-white hover:text-(--personal)" href="/free">
          <p>
            Store ❔
          </p>
        </Link>
      </li>
    </ul>
  );
};

export default Menus;