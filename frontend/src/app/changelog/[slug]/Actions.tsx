"use client"
import React, { useState } from 'react'

import { EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/outline';

import ButtonRemove from '@/app/changelog/[slug]/ButtonRemove'
import ButtonActive from '@/app/changelog/[slug]/ButtonActive'

interface Props {
  postId: string
  postActive?: boolean | null | undefined
}

export default function Actions({ postId, postActive }: Props) {
  const [active, setActive] = useState(postActive)


  return (
    <div className="actions absolute top-0 right-0 flex flex-col gap-4">
      <ButtonRemove className="button-remove cursor-pointer hover:text-(--primary-orange-1)" postId={postId}>
        <TrashIcon className="icon duration-[.25s] !h-[2rem] !w-[2rem]" />
      </ButtonRemove>
      <ButtonActive className="button-active cursor-pointer hover:text-(--primary-orange-1)" postId={postId} postActive={active} postSetActive={setActive}>
        {active
          ? <EyeSlashIcon className="icon duration-[.25s] pointer-events-auto !h-[2rem] !w-[2rem]" />
          : <EyeIcon className="icon duration-[.25s] pointer-events-auto !h-[2rem] !w-[2rem]" />
        }
      </ButtonActive>
    </div>
  )
}
