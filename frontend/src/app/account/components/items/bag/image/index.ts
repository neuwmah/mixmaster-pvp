import monsterJson from './.item.json'

type MonsterEntry = {
  sprite?: number
  icon?: string
}

const monsterMap: Record<string, MonsterEntry> = monsterJson as unknown as Record<string, MonsterEntry>

export function getIcon(id: string | false) {
  let response = `/assets/images/items/000000.bmp`
  if (!id) return response

  const entry: MonsterEntry | undefined = monsterMap[id]
  const icon = entry?.icon
  if (icon) response = `/assets/images/items/000000.bmp`
  
  return response
}