"use client"
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (response.ok) {
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