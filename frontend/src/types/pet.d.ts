import type { Character } from './character'
import type { Hench } from './hench'

export interface Pet {
  id: string
  created_at: string | Date
  nickname?: string | null
  level: number
  exp: number
  characterId: string
  templateId: string
  in_party: boolean
  slot?: number | null
  character?: Character
  template?: Hench
}