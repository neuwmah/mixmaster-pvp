import React from 'react'

import Actions from '@/app/changelog/[slug]/components/fullbanner/Actions'
import EditableText from '@/app/changelog/[slug]/components/content/EditableText'

interface Props {
  isAdmin: boolean
  postId: string
  postActive?: boolean | null | undefined
  postSlug?: string
  postTitle?: string
  postCreatedAt?: string | Date
}

export default function Fullbanner({ isAdmin, postId, postActive, postSlug, postTitle, postCreatedAt }: Props) {
  return (
    <section className="section-fullbanner section !my-[0] py-16 sm:py-24 bg-(--black)">
      <div className="container flex justify-center">
        <div className="content flex flex-col items-center w-full max-w-[700px] relative">

          {isAdmin && 
            <Actions postId={postId} postActive={postActive} postSlug={postSlug} />
          }

          <EditableText
            className="title text-center"
            tag="h1"
            field="title"
            postId={postId}
            initialValue={postTitle}
            isAdmin={isAdmin}
          />

          <p className="text-base text-center mt-4 text-(--gray-4)">
            {postCreatedAt ? new Date(postCreatedAt).toLocaleDateString() : 'N/A'}
          </p>

        </div>
      </div>
    </section>
  )
}
