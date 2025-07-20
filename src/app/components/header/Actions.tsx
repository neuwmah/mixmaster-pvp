"use client"
import React from 'react';
import Link from 'next/link';

import {
  ArrowDownTrayIcon,
  Bars3Icon,
  ShoppingCartIcon,
  UserIcon
} from '@heroicons/react/24/outline';

import { useMobile } from '../../hooks/checkMobile';

const Actions: React.FC = () => {
  const mobile = useMobile();

  return (
    <div className="actions flex items-center gap-8">
      {mobile && 
        <button className="button cursor-pointer text-white hover:text-(--personal)" type="button">
          <Bars3Icon className="icon" />
        </button>
      }
      <Link className="link flex text-white hover:text-(--personal)" href="/download">
        <ArrowDownTrayIcon className="icon" />
      </Link>
      <Link className="link flex text-white hover:text-(--personal)" href="/account">
        <UserIcon className="icon" />
      </Link>
      {/* <button className="button cursor-pointer flex relative text-white hover:text-(--personal)" type="button">
        <ShoppingCartIcon className="icon" />
        <span className="count font-medium text-sm text-black flex items-center justify-center rounded-full bg-white absolute top-[-4px] right-[-4px] w-6 h-6">
          0
        </span>
      </button> */}
    </div>
  );
};

export default Actions;