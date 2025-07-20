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

const Actions: React.FC<{ openMenuMobile?: () => void }> = ({ openMenuMobile }) => {
  const mobile = useMobile();

  return (
    <div className="actions flex items-center gap-8">
      <Link className="link flex text-white hover:text-(--personal)" href="/download">
        <ArrowDownTrayIcon className="icon" />
      </Link>
      {mobile 
        ? <button
          className="button cursor-pointer text-white hover:text-(--personal)"
          type="button"
          onClick={openMenuMobile}
        >
          <Bars3Icon className="icon" />
        </button>
        : <Link 
          className="link flex text-white hover:text-(--personal)" 
          href="/account"
        >
          <UserIcon className="icon" />
        </Link>
      }
    </div>
  );
};

export default Actions;