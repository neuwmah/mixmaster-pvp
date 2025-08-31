export interface Guild {
  id: string
  created_at: string | Date
  name: string
  masterId?: string | null
  master?: Character | null
  castles_count: number
  members_count: number
  members?: Character[]
}