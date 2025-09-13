"use client"
import React, { useEffect, useState, useRef } from 'react'

import CharactersCreate from '@/app/account/components/CharactersCreate'
import HenchCreate from '@/app/account/components/HenchCreate'
import HenchManage from '@/app/account/components/HenchManage'
import Details from '@/app/account/components/Details'
import Characters from '@/app/account/components/Characters'

import { User } from '@/types/user'
import { Character } from '@/types/character'
import { Hench } from '@/types/hench'

interface RouterProps {
  user: User;
}

export default function Router({ user }: RouterProps) {
  const [create, setCreate] = useState(false)
  const [petsList, setPetsList] = useState<Character | undefined>(undefined)
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

  return !user.characters?.length || create
    ? <CharactersCreate user={user} create={create} setCreate={handleSetCreate} setHenchList={setHenchList} setHenchListDisplay={setHenchListDisplay} />
    : henchList.length > 0 && henchListDisplay
      ? <HenchCreate user={user} character={petsList} henches={henchList} setPetsList={setPetsList} setHenchListDisplay={setHenchListDisplay} />
      : petsList != undefined
        ? <HenchManage character={petsList} henches={henchList} setPetsList={setPetsList} setHenchList={setHenchList} setHenchListDisplay={setHenchListDisplay} />
        : 
        <>
          <Details user={user} />
          <Characters user={user} setPetsList={setPetsList} handleSetCreate={handleSetCreate} />
        </>
}