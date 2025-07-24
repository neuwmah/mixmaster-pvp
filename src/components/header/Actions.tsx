"use client"
import React from 'react';
import Link from 'next/link';

import {
  ArrowDownTrayIcon,
  Bars3Icon,
  ShoppingCartIcon,
  UserIcon
} from '@heroicons/react/24/outline';

import { checkMobile } from '@/hooks/mobile';

interface ActionsProps {
  setMenuMobile: (value: boolean) => void;
}

const Actions: React.FC<ActionsProps> = ({ setMenuMobile }) => {
  const mobile = checkMobile();

  return (
    <div className="actions flex items-center gap-8">
      <Link className="link flex text-white duration-250 hover:text-(--primary-orange-1)" href="/download">
        <ArrowDownTrayIcon className="icon" />
      </Link>
      {mobile 
        ? <button
          className="button cursor-pointer text-white duration-250 hover:text-(--primary-orange-1)"
          type="button"
          onClick={() => { setMenuMobile(true) }}
        >
          <Bars3Icon className="icon" />
        </button>
        : <Link 
          className="link flex text-white duration-250 hover:text-(--primary-orange-1)" 
          href="/account"
        >
          <UserIcon className="icon" />
        </Link>
      }
    </div>
  );
};

export default Actions;