import { NextResponse } from 'next/server'
import createApiClient from '@/hooks/axios'

const baseEnv = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || ''

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!baseEnv) return NextResponse.json({ message: 'api offline' }, { status: 500 })
  const { id } = await params
  if (!id) return NextResponse.json({ message: 'missing id' }, { status: 400 })

  // auth cookie
  const cookieHeader = req.headers.get('cookie') || ''
  const match = cookieHeader.match(/(?:^|; )sessionToken=([^;]+)/)
  const token = match ? decodeURIComponent(match[1]) : null
  if (!token) return NextResponse.json({ message: 'unauthorized' }, { status: 401 })

  let formData: FormData
  try { formData = await req.formData() } catch { return NextResponse.json({ message: 'invalid form' }, { status: 400 }) }
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ message: 'file required' }, { status: 400 })
  if (!(file as any).type?.startsWith?.('image/')) return NextResponse.json({ message: 'invalid mimetype' }, { status: 400 })

  // verify admin
  const api = createApiClient(baseEnv)
  const me = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data).catch(() => null)
  if (!me?.is_admin) return NextResponse.json({ message: 'forbidden' }, { status: 403 })

  // forward upload using fetch (keeps streaming if possible)
  const forward = new FormData()
  forward.append('file', file, (file as any).name || 'upload.png')
  try {
    const res = await fetch(`${baseEnv}/changelog/${id}/image`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: forward
    })
    const txt = await res.text()
    let json: any
    try { json = JSON.parse(txt) } catch { json = null }
    if (!res.ok) return NextResponse.json(json || { message: 'upload failed' }, { status: res.status })
    return NextResponse.json(json, { status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: 'proxy upload error' }, { status: 500 })
  }
}
