import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

import { getUserByCredentials } from '@/app/api/user';

const SECRET_KEY = process.env.JWT_SECRET || '123';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  const user = await getUserByCredentials(username, password);

  if (!user) {
    return NextResponse.json({ message: 'user not found' }, { status: 401 });
  }

  const token = sign(
    { userId: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  const serializedCookie = serialize('sessionToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60,
    path: '/',
  });

  return new NextResponse(JSON.stringify({ message: 'user found' }), {
    status: 200,
    headers: { 'Set-Cookie': serializedCookie },
  });
}