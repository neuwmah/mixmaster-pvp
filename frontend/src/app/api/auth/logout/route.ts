import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  try {
    const res = NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );

    res.headers.set(
      'Set-Cookie',
      serialize('sessionToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
      })
    );

    return res;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
