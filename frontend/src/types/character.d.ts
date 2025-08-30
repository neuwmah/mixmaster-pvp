export type Character = {
  id: string
  created_at: Date
  user: User
  guild: Guild
  name: string
  class: string
  level: number
  map: string
  exp: number
  gold: number
  attributes: {
    energy: number
    agility: number
    accuracy: number
    luck: number
  }
  kills_count: number
  castles_count: number
  online_status: boolean
  online_time: number
  last_connection_date: Date
  last_connection_ip: string
}