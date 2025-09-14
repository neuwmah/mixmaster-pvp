import React, { useEffect, useState } from 'react'

import ItemInline from '@/app/account/components/items/store/Inline'

import { Character } from '@/types/character'
import { Item } from '@/types/item'

interface BagProps {
  items: Item[]
  maxSelection?: number
  selectedItems?: Array<string>
  setItems: (value: Character | undefined) => void
  setSelectedItems?: (value: Array<string>) => void
}

export default function Bag({ items, maxSelection, selectedItems, setItems, setSelectedItems }: BagProps) {
  const [weapons, setWeapons] = useState<Item[]>([])
  const [vestments, setVestments] = useState<Item[]>([])
  const [equipments, setEquipments] = useState<Item[]>([])

  useEffect(() => {
    const weapons = items.filter(item => item.equip_part0 == 1)
    setWeapons(weapons)
    const vestments = items.filter(item => item.equip_part0 == 3 && item.name.includes('[Ultra]') && !item.name.includes(' P'))
    setVestments(vestments)
    const equipments = items.filter(item => item.name.includes('[UltStep]'))
    setEquipments(equipments)
  }, [])

  return (
    <div className="
      store
      text-base
      flex flex-col gap-[3.2rem]
      w-full max-w-[1000px]
    ">  
      {!items?.length && (
        <p className="text-center">
          No items found.
        </p>
      )}

      {weapons?.length ? (
        <div className="weapons flex flex-col w-full">
          {weapons
            .slice()
            .map((item, i) => 
              <ItemInline 
                item={item} 
                key={`item${i}`} 
                setItems={setItems}
              />
            )}
        </div>
      ) : null}

      {vestments?.length ? (
        <div className="vestments flex flex-col w-full">
          {vestments
            .slice()
            .map((item, i) => 
              <ItemInline 
                item={item} 
                key={`item${i}`} 
                setItems={setItems}
              />
            )}
        </div>
      ) : null}

      {equipments?.length ? (
        <div className="equipments flex flex-col w-full">
          {equipments
            .slice()
            .map((item, i) => 
              <ItemInline 
                item={item} 
                key={`item${i}`} 
                setItems={setItems}
              />
            )}
        </div>
      ) : null}
    </div>
  )
}