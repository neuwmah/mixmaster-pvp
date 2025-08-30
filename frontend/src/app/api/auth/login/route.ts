import { NextResponse } from 'next/server'
import { serialize } from 'cookie'
import createApiClient from '@/hooks/axios'

const baseEnv = process.env.BACKEND_API_URL

export async function POST(request: Request) {
  if (!baseEnv) return NextResponse.json({ message: 'api offline' }, { status: 500 })
  const body = await request.json()
  const { username, password } = body
  try {
    const api = createApiClient(baseEnv)
    const { data } = await api.post('/auth/login', { username, password })
    if (!data?.token) return NextResponse.json({ message: 'user not found' }, { status: 401 })
    const serializedCookie = serialize('sessionToken', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60,
      path: '/',
    })
    return new NextResponse(JSON.stringify({ message: 'user found' }), {
      status: 200,
      headers: { 'Set-Cookie': serializedCookie },
    })
  } catch {
    return NextResponse.json({ message: 'user not found' }, { status: 401 })
  }
}