import React from 'react';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

import { checkAdmin } from '@/app/api/admin';
import { getUser } from '@/app/api/user';
import { getCharactersByUser } from '@/app/api/character';

import Details from '@/app/account/components/Details';
import Characters from '@/app/account/components/Characters';
import Admin from '@/app/account/components/Admin';

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

    if (!user)
      return redirect('/account/signin')

    const userData = {
      ...user,
      characters: await getCharactersByUser({ id: user.id  })
    }

    return (
      <main>
        <Details user={userData} />
        {userData.characters.length > 0 && <Characters user={userData} /> }
        {admin && <Admin /> }
      </main>
    )

  } catch (error) {
    console.error('invalid token', error);
    return redirect('/account/signin')
  }
}