'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Logo from '@/components/header/Logo'
import Menus from '@/components/Menus'

interface HeaderClientProps {
  menus: any[]
}

export default function HeaderClient({ menus }: HeaderClientProps) {
  const pathname = usePathname()
  const isAccount = pathname?.includes('/account')
  return (
    <header className={`header w-full h-[88px] border-b-1 bg-(--black) border-(--gray-1) ${isAccount ? 'relative' : 'sticky top-0'} z-30`}>
      <nav className="container justify-between relative h-full">
        <div className="logo-mm my-auto">
          <Logo />
        </div>
        <Menus menus={menus} />
      </nav>
    </header>
  )
}