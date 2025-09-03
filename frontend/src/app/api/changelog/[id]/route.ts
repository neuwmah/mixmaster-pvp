import { NextResponse } from 'next/server'
import createApiClient from '@/hooks/axios'

const baseEnv = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || ''

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params
  if (!id) return NextResponse.json({ message: 'missing id' }, { status: 400 })
  const authHeader = req.headers.get('cookie') || ''
  const match = authHeader.match(/(?:^|; )sessionToken=([^;]+)/)
  const token = match ? decodeURIComponent(match[1]) : null
  if (!token) return NextResponse.json({ message: 'unauthorized' }, { status: 401 })
  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ message: 'invalid body' }, { status: 400 }) }
  try {
    const api = createApiClient(baseEnv)
    const me = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data).catch(() => null)
    if (!me?.is_admin) return NextResponse.json({ message: 'forbidden' }, { status: 403 })
    const updated = await api.put(`/changelog/${id}`, body, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data)
    return NextResponse.json(updated, { status: 200 })
  } catch (e) {
    return NextResponse.json({ message: 'update failed' }, { status: 500 })
  }
}
