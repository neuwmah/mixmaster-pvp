import React from 'react';
import { cookies } from 'next/headers'

import { getChangelogs } from '@/app/api/changelog'

import createApiClient from '@/hooks/axios'

import EditableText from '@/app/changelog/[slug]/EditableText'
import EditableImage from '@/app/changelog/[slug]/EditableImage'
import Related from '@/app/changelog/[slug]/Related'

interface ChangelogProps {
  params: {
    slug: string
  }
}

export default async function ChangelogPage({ params }: ChangelogProps) {
  const { slug } = await params
  const changelogsData = await getChangelogs()
  const post = changelogsData.find(p => p.slug === slug)
  const cookieStore = await cookies()
  const token = cookieStore.get('sessionToken')?.value
  let isAdmin = false
  if (token) {
    try {
      const baseEnv = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL || ''
      const api = createApiClient(baseEnv)
      const { data } = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      if (data?.is_admin) isAdmin = true
    } catch {}
  }
  return (
    <main>
      {post ? (
        <section className="section-changelog section">
          <div className="container flex justify-center">
            <div className="content flex flex-col items-center w-full max-w-[700px]">

              <EditableText className="title text-center" tag="h1" field="title" postId={post.id} initialValue={post.title} isAdmin={isAdmin} />

              <p className="text-base text-center mt-4 text-(--gray-4)">
                {new Date(post.created_at).toLocaleDateString()}
              </p>

              {post.content1 && 
                <EditableText className="text-base text-left text-white mt-12 mr-auto w-full" field="content1" postId={post.id} initialValue={post.content1} isAdmin={isAdmin} />
              }
              {post.image_src || isAdmin ? 
                <EditableImage postId={post.id} imageSrc={post.image_src || undefined} isAdmin={isAdmin} />
              : null}
              {post.content2 && 
                <EditableText className="text-base text-left text-white mt-6 mr-auto w-full" field="content2" postId={post.id} initialValue={post.content2} isAdmin={isAdmin} />
              }

            </div>
          </div>
        </section>
      ) : (
        <div className="section-not-found section">
          <div className="container flex flex-col items-center">
            <h1 className="title text-center">❗ 404</h1>
            <p className="text-big text-center mt-6 text-(--gray-4)">Not found.</p>
          </div>
        </div>
      )}
      <Related />
    </main>
  )
}