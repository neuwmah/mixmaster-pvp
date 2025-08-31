export type User = {
  id: string
  created_at: string | Date
  username: string
  password?: string
  email: string
  phone?: string | null
  characters?: Character[]
  online_points: number
  online_status: boolean
  online_time: number
  last_connection_date?: string | Date | null
  last_connection_ip?: string | null
  is_admin: boolean
}