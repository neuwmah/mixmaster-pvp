import { NextRequest, NextResponse } from 'next/server'

const baseEnv = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL || ''

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!baseEnv) return NextResponse.json({ message: 'API URL not configured' }, { status: 500 })
  const { id } = params
  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 }) }

  const token = req.cookies.get('sessionToken')?.value
  if (!token) return NextResponse.json({ message: 'unauthorized' }, { status: 401 })

  try {
    const res = await fetch(`${baseEnv}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
    const data = await res.json().catch(() => undefined)
    return NextResponse.json(data, { status: res.status })
  } catch (e) {
    return NextResponse.json({ message: 'proxy error' }, { status: 500 })
  }
}
