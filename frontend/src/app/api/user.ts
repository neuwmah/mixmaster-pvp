import createApiClient from '@/hooks/axios'
import { User, UserCreate, UserLogin } from '@/types/user'

const baseEnv = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL || ''

function api() { return createApiClient(baseEnv) }

export async function createUser(payload: UserCreate): Promise<{ data?: User; error?: string }> {
  try {
    const { data } = await api().post('/users', payload)
    return { data: data as User }
  } catch (e: any) {
    console.error('createUser error', e)
    const message = e?.response?.data?.message || 'Create user failed'
    return { error: message }
  }
}

export async function loginUser(payload: UserLogin): Promise<{ token?: string; error?: string }> {
  try {
    const { data } = await api().post('/auth/login', payload)
    return { token: data.token }
  } catch (e: any) {
    console.error('loginUser error', e)
    const message = e?.response?.data?.message || 'Login failed'
    return { error: message }
  }
}

export async function getMe(token: string): Promise<{ data?: User; error?: string }> {
  try {
    const { data } = await api().get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return { data: data as User }
  } catch (e: any) {
    console.error('getMe error', e)
    return { error: 'Failed to get user data' }
  }
}
