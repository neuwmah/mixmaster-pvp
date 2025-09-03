import createApiClient from '@/hooks/axios'
import { User, UserCreate, UserUpdate } from '@/types/user'

const baseEnv = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL || ''

function api() { return createApiClient(baseEnv) }

export async function getUsers(): Promise<User[]> {
  try {
    const { data } = await api().get('/users')
    return Array.isArray(data) ? data as User[] : []
  } catch { return [] }
}

export async function getUser(id: string): Promise<User | null> {
  try {
    const { data } = await api().get(`/users/${id}`)
    return data as User
  } catch { return null }
}

export async function getUserByUsername(username: string): Promise<User | null> {
  try {
    const { data } = await api().get(`/users/exists/${username}`)
    if (!data?.exists) return null
    const users = await getUsers()
    return users.find(u => u.username === username) || null
  } catch { return null }
}

export async function verifyCredentials(username: string, password: string): Promise<{ id: string; username: string } | null> {
  try {
    const { data } = await api().post('/users/check', { username, password })
    return data
  } catch { return null }
}

export async function createUser(payload: UserCreate): Promise<User | null> {
  try {
    const { data } = await api().post('/users', payload)
    return data as User
  } catch (e) { console.error('createUser error', e); return null }
}

export async function updateUser(id: string, payload: UserUpdate): Promise<{ data?: User; error?: string }> {
  try {
    const body: UserUpdate = {}
    ;(['email','phone','password'] as (keyof UserUpdate)[]).forEach(k => {
      if (payload[k] !== undefined) (body as any)[k] = payload[k]
    })
    if (!Object.keys(body).length) return { error: 'Nada para atualizar.' }
    const res = await fetch(`/api/user/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (!res.ok) {
      const json = await res.json().catch(() => ({}))
      return { error: json?.message || 'Falha ao atualizar.' }
    }
    const data = await res.json()
    return { data }
  } catch (e: any) {
    return { error: 'Erro inesperado.' }
  }
}