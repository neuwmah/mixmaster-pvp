import React from 'react'

import EditableText from '@/app/changelog/[slug]/components/content/EditableText'
import EditableImage from '@/app/changelog/[slug]/components/content/EditableImage'

import BackgroundMix from '@/components/BackgroundMix'

interface Props {
  isAdmin: boolean
  postId: string
  postContent1: string | null | undefined
  postContent2: string | null | undefined
  postImageSrc: string | null | undefined
}

export default function Content({ isAdmin, postId, postContent1, postContent2, postImageSrc }: Props) {
  const textClass = 'text-base text-left text-white mr-auto w-full'

  return (
    <section className="
      section-content section
      !mt-[0] pb-24 sm:pb-32
      bg-gradient-to-b from-black bg-(--gray-0)
    ">
      <div className="container flex justify-center relative z-2">
        <div className="content flex flex-col items-center w-full max-w-[700px] relative">

          {postContent1 && 
            <EditableText
              className={`${textClass}`}
              field="content1"
              postId={postId}
              initialValue={postContent1}
              isAdmin={isAdmin}
            />
          }
          {postImageSrc || isAdmin ? 
            <EditableImage
              postId={postId}
              imageSrc={postImageSrc || undefined}
              isAdmin={isAdmin}
            />
          : null}
          {postContent2 && 
            <EditableText
              className={`${textClass} mt-[2.4rem]`}
              field="content2"
              postId={postId}
              initialValue={postContent2}
              isAdmin={isAdmin}
            />
          }

        </div>
      </div>
      <BackgroundMix char1="penril" char2="ditt" />
    </section>
  )
}
