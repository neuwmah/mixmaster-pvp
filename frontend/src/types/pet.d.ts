import type { Character } from './character'
import type { Hench } from './hench'

export interface Pet {
  id: string
  created_at: string | Date
  nickname?: string | null
  level: number
  exp: number
  characterId: string
  henchId: string
  hench?: Hench
  in_party: boolean
  character?: Character
  hench_order?: number
}