"use client"
import React, { useState } from 'react'

import { EyeIcon, EyeSlashIcon, GlobeAltIcon, TrashIcon } from '@heroicons/react/24/outline';

import ButtonRemove from '@/app/changelog/[slug]/components/fullbanner/actions/ButtonRemove'
import ButtonActive from '@/app/changelog/[slug]/components/fullbanner/actions/ButtonActive'
import ButtonSlug from '@/app/changelog/[slug]/components/fullbanner/actions/ButtonSlug';

interface Props {
  postId: string
  postActive?: boolean | null | undefined
  postSlug?: string
}

export default function Actions({ postId, postActive, postSlug }: Props) {
  const [active, setActive] = useState(postActive)
  const [slug, setSlug] = useState(postSlug)
  const buttonClass = 'cursor-pointer hover:text-(--primary-orange-1)'
  const iconClass = 'icon duration-[.25s] !h-[2rem] !w-[2rem]'

  return (
    <div className="actions absolute top-0 right-0 flex flex-col gap-4">
      <ButtonRemove className={`button-remove ${buttonClass}`} postId={postId}>
        <TrashIcon className={iconClass} />
      </ButtonRemove>
      <ButtonActive 
        className={`button-active ${buttonClass}`}
        postId={postId}
        postActive={active}
        postSetActive={setActive}
      >
        {active
          ? <EyeSlashIcon className={iconClass} />
          : <EyeIcon className={iconClass} />
        }
      </ButtonActive>
      <ButtonSlug 
        className={`button-slug ${buttonClass}`}
        postId={postId}
        postSlug={slug}
        postSetSlug={setSlug}
      >
        <GlobeAltIcon className={iconClass} />
      </ButtonSlug>
    </div>
  )
}
