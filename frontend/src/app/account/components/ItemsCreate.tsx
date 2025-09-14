import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import Store from '@/app/account/components/items/Store'

import { Item } from '@/types/item'
import { Character } from '@/types/character'

interface ItemCreateProps {
  items: Item[]
  setItems: (value: Character | undefined) => void
  setItemsList: (value: Item[]) => void
}

export default function ItemsCreate({ items, setItems, setItemsList }: ItemCreateProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [sending, setSending] = useState(false)
  const router = useRouter()

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault()
    setSending(true)

    try {
      router.refresh()
    } catch {
      alert('Unexpected error.')
    }

    setSending(false);
  }

  return (
    <section className="
      section-items-create section
      my-[0!important]
      overflow-hidden
      py-20 sm:py-32
      scroll-mt-20 sm:scroll-mt-32
      sm:min-h-[calc(100vh-8.8rem-3.2rem-4.2rem)]
      sm:flex sm:items-center
    ">
      <div className="container flex-col items-center z-1 relative">
        <h2 className="title">
          Items 🛡️
        </h2>

        <p className={`text-big text-center mt-6`}>
          Select new items to create below.
        </p>

        <div className="items-create mt-12 w-full flex flex-col items-center">
          <Store items={items} setItems={setItems} setSelectedItems={setSelectedItems} maxSelection={100} />

          <div className="mt-16 flex items-center gap-4">
            <button
              className="w-auto button-gray"
              type="button"
              aria-label="Close Items Create"
              onClick={() => setItemsList([])}
            >
              Return
            </button>

            <button
              className={`w-auto button-orange disabled:!cursor-not-allowed`}
              type="button"
              aria-label="Add New Pet"
              onClick={handleCreate}
              disabled={!selectedItems?.length || sending}
            >
              {sending ? '...' : 'Create 🛡️'}
            </button>
          </div>
        </div>
      </div>

      <svg className="absolute top-0 left-0 w-full pointer-events-none z-1 rotate-[180deg]" viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg">
        <path className="fill-(--gray-1)" d="M0,0L1440,40L1440,40L0,40Z"></path>
      </svg>

      <svg className="absolute bottom-0 left-0 w-full pointer-events-none z-1" viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg">
        <path className="fill-(--gray-1)" d="M0,0L1440,40L1440,40L0,40Z"></path>
      </svg>
    </section>
  )
}