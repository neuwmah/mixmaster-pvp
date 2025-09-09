import React from 'react';
import { cookies } from 'next/headers'

import { getChangelogs } from '@/app/api/changelog'

import createApiClient from '@/hooks/axios'

import Fullbanner from '@/app/changelog/[slug]/components/Fullbanner'
import Content from '@/app/changelog/[slug]/components/Content'
import NotFound from '@/app/changelog/[slug]/components/NotFound'
import Related from '@/app/changelog/[slug]/components/Related'

export default async function ChangelogPage({ params }: { params: Promise<{ slug: string }> }) {
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
        <>
          <Fullbanner
            isAdmin={isAdmin}
            postId={post.id}
            postActive={post.active}
            postSlug={post.slug}
            postTitle={post.title}
            postCreatedAt={post.created_at}
          />
          <Content
            isAdmin={isAdmin}
            postId={post.id}
            postContent1={post.content1}
            postContent2={post.content2}
            postImageSrc={post.image_src}
          />
        </>
      ) : (
        <NotFound />
      )}
      <Related />
    </main>
  )
}