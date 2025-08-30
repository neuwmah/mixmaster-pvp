import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  const serializedCookie = serialize('sessionToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  });

  return new NextResponse(JSON.stringify({ message: 'Logout successful' }), {
    status: 200,
    headers: { 'Set-Cookie': serializedCookie },
  });
}