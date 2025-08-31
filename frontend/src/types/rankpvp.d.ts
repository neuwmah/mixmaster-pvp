import type { Character } from './character'
import type { Guild } from './guild'

export interface RankPVP {
  id: string
  player: Character | null
  guild: Guild | null
}