"use client"
import { useRouter } from 'next/navigation';

import { logoutUser } from '@/app/api/user';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await logoutUser() as Boolean;

    if (response) {
      router.push('/account/signin');
      router.refresh();
    } else {
      console.log('logout failed');
    }
  };

  return (
    <button className="text-base text-(--gray-3) mt-6 cursor-pointer hover:underline" onClick={handleLogout}>
      Disconnect
    </button>
  );
}