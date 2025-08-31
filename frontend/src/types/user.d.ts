export type User = {
  id: string
  created_at: string | Date
  characters?: Character[]
  username: string
  email: string
  phone?: string
  online_points?: number
  online_status?: boolean
  online_time?: number
  last_connection_date?: string | Date | null
  last_connection_ip?: string | null
  password?: string
  is_admin?: boolean
}