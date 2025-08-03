import React from 'react';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

import { getUser } from '@/app/api/user';
import { checkAdmin } from '@/app/api/admin';

import Details from './components/Details';
import Characters from './components/Characters';
import Admin from './components/Admin';

const SECRET_KEY = process.env.JWT_SECRET || '123';

export default async function AccountPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sessionToken')?.value;

  if (!token)
    return redirect('/account/signin')

  try {
    const decoded = verify(token, SECRET_KEY) as { userId: string };
    const userId = decoded.userId;

    const user = await getUser(userId);
    const admin = await checkAdmin(userId);

    return user
      ? (
          <main>
            <Details user={user} />
            <Characters user={user} />
            {admin && (
              <Admin />
            )}
          </main>
        ) 
      : redirect('/account/signin')

  } catch (error) {
    console.error('invalid token', error);
    return redirect('/account/signin')
  }
}