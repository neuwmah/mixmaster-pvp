import React from 'react';
import { redirect } from 'next/navigation';

import { User } from './type';
import { userData } from './data';

import Details from './components/Details';
import Characters from './components/Characters';

export default function AccountPage() {
  const user: User | undefined = userData.find((p) => p.id === 833);
  if (!user)
    return redirect('/account/signup');

  return (
    <main>
      <Details user={user} />
      <Characters user={user} />
    </main>
  );
}