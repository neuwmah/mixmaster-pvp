export interface Hero {
  id_idx: number
  hero_order: number
  serial: string
  class: number
  name: string
  hero_type: number
  baselevel: number
  exp: number
  resets: number
  str: number
  dex: number
  aim: number
  luck: number
  login: boolean
}

export interface RankHero {
  id: string
  hero: Hero | null
}
