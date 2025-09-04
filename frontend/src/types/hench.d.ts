import type { Pet } from './pet'

export interface Hench {
  id: string
  created_at: string | Date
  code: string
  name: string
  description?: string | null
  rarity?: string | null
  base_level: number
  base_exp: number
  sprite_url?: string | null
  active: boolean
  pets?: Pet[]
}