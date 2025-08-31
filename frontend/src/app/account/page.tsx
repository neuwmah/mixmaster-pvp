import React from 'react';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import createApiClient from '@/hooks/axios'

import Details from '@/app/account/components/Details';
import Characters from '@/app/account/components/Characters';
import Admin from '@/app/account/components/Admin';

export default async function AccountPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sessionToken')?.value;

  if (!token)
    return redirect('/account/signin')

  try {
    const baseEnv = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3333'
    const api = createApiClient(baseEnv)
    const { data } = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
    const userData = data

    return (
      <main>
        <Details user={userData} />
        <Characters user={userData} />
        {userData.is_admin && <Admin /> }
      </main>
    )

  } catch (error) {
    console.error('auth/me failed', error);
    return redirect('/account/signin')
  }
}