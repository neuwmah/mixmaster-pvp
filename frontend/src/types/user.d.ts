import type { Character } from './character'

export interface User {
  id: string
  username: string
  email?: string | null
  phone?: string | null
  is_admin?: boolean
  online_status?: boolean
  characters?: Character[]
  created_at?: string
  updated_at?: string
}

export interface UserCreate {
  username: string
  email: string
  password: string
  phone?: string | null
}

export interface UserUpdate {
  email?: string
  phone?: string | null
  password?: string
}