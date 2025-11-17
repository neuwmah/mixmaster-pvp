"use client"
import React, { useEffect, useState, useRef } from 'react'

import CharactersCreate from '@/app/account/components/CharactersCreate'
import HenchCreate from '@/app/account/components/HenchCreate'
import HenchManage from '@/app/account/components/HenchManage'
import ItemsManage from '@/app/account/components/ItemsManage'
import ItemsCreate from '@/app/account/components/ItemsCreate'
import Details from '@/app/account/components/Details'
import Characters from '@/app/account/components/Characters'

import { User, Hero } from '@/types/user'
import { Hench } from '@/types/hench'
import { Item } from '@/types/item'

interface RouterProps {
  user: User;
}

export default function Router({ user }: RouterProps) {
  const [create, setCreate] = useState(false)

  const [items, setItems] = useState<Hero | undefined>(undefined)
  const [petsList, setPetsList] = useState<Hero | undefined>(undefined)

  const [itemsList, setItemsList] = useState<Item[]>([])
  const [henchList, setHenchList] = useState<Hench[]>([])

  const [henchListDisplay, setHenchListDisplay] = useState(false)

  const userActionRef = useRef(false)
  const initialRenderRef = useRef(true)
  
  const handleSetCreate = (value: boolean) => {
    userActionRef.current = true
    setCreate && setCreate(value)
  }

  useEffect(() => {
    setCreate && setCreate(false)
  }, [])

  useEffect(() => {
    if (initialRenderRef.current) {
      initialRenderRef.current = false
      userActionRef.current = false
      return
    }
    if (!userActionRef.current) return
    userActionRef.current = false
  }, [create])

  return !user.heroes?.length || create
    ? <CharactersCreate user={user} create={create} setCreate={handleSetCreate} setHenchList={setHenchList} setHenchListDisplay={setHenchListDisplay} setPetsList={setPetsList} />
    : henchList.length > 0 && henchListDisplay
      ? <HenchCreate user={user} character={petsList} henches={henchList} setPetsList={setPetsList} setHenchListDisplay={setHenchListDisplay} isFirstTime={true} />
      : petsList != undefined
        ? <HenchManage character={petsList} henches={henchList} setPetsList={setPetsList} setHenchList={setHenchList} setHenchListDisplay={setHenchListDisplay} />
        : itemsList.length > 0
          ? <ItemsCreate items={itemsList} setItems={setItems} setItemsList={setItemsList} />
          : items != undefined
            ? <ItemsManage character={items} setItems={setItems} setItemsList={setItemsList} />
            :
              <>
                <Characters user={user} setPetsList={setPetsList} setItems={setItems} handleSetCreate={handleSetCreate} />
                <Details user={user} />
              </>
}