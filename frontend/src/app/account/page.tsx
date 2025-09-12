import React from 'react'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import createApiClient from '@/hooks/axios'

import Router from '@/app/account/components/Router'
import News from '@/app/home/News'

export default async function AccountPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('sessionToken')?.value

  if (!token)
    return redirect('/account/signin')

  try {
    const baseEnv = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || ''
    const api = createApiClient(baseEnv)
    const { data } = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
    const userData = data

    return (
      <main>
        <Router user={userData} />
        {userData.is_admin && <News account={true} /> }
      </main>
    )

  } catch (error) {
    console.error('auth/me failed', error)
    return redirect('/account/signin')
  }
}