export interface User {
  id_idx: number
  PlayerID: string
  Name: string
  Email?: string
  Block: string
  Access: number
  RegDate: string
  LastLoginDate?: string
  heroes?: Hero[]
}

export interface Hero {
  id_idx: number
  hero_order: number
  serial: string
  name: string
  hero_type: number
  class: number
  baselevel: number
  exp: string
  str: number
  dex: number
  aim: number
  luck: number
  gold: number
  abil_freepoint: number
  now_zone_idx: number
  login: boolean
  resets: number
}

export interface UserCreate {
  username: string
  password: string
  name: string
  email: string
}

export interface UserLogin {
  username: string
  password: string
}
