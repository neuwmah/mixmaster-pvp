export type Character = {
  id: string
  created_at: string | Date
  userId?: string | null
  user?: User | null
  guildId?: string | null
  guild?: Guild | null
  name: string
  class: string
  level: number
  map: string
  exp: number
  gold: number
  energy: number
  agility: number
  accuracy: number
  luck: number
  kills_count: number
  castles_count: number
  online_status: boolean
  online_time: number
  last_connection_date?: string | Date | null
  last_connection_ip?: string | null
  transferPending?: boolean
  transferTargetUserId?: string | null
  transferRequestedAt?: string | Date | null
  pets?: import('./pet').Pet[]
}