import type { Pet } from './pet'

export interface Hench {
  id: string
  created_at: string | Date
  code: string
  name: string
  type: string | null
  base_level: number
  base_exp: number
  sprite_url?: string | null
  icon_url?: string | null
  active: boolean
  pets?: Pet[]
  race?: number | null
  start_base_level?: number | null
  mix_restrict?: number | null
  is_droppable?: boolean
}