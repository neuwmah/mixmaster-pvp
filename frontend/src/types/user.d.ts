export type User = {
  id: string
  created_at: Date
  characters: Character[]
  username: string
  password: string
  email: string
  phone: string
  online_points: number
  online_status: boolean
  online_time: number
  last_connection_date: Date
  last_connection_ip: string
}