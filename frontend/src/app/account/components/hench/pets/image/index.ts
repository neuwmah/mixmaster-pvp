import monsterJson from './.monster.json'

type MonsterEntry = {
  sprite?: number
  icon?: string
}

const monsterMap: Record<string, MonsterEntry> = monsterJson as unknown as Record<string, MonsterEntry>

export function getIcon(id: string) {
  let response = `/assets/images/henchwebp/icon/000001.webp`
  if (!id) return response

  const entry: MonsterEntry | undefined = monsterMap[id]
  const icon = entry?.icon
  if (icon) response = `/assets/images/henchwebp/icon/000${icon}.webp`
  
  return response
}

export function getSprite(id: string) {
  let response = `/assets/images/henchwebp/sprite/mh1.webp`
  if (!id) return response

  const entry: MonsterEntry | undefined = monsterMap[id]
  const sprite = entry?.sprite
  if (sprite) response = `/assets/images/henchwebp/sprite/mh${sprite}.webp`

  return response
}