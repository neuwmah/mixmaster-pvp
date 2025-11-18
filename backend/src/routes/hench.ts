import { FastifyInstance } from 'fastify'
import { myServerPrisma } from '../db.js'

export async function henchRoutes(app: FastifyInstance) {
  app.get('/hench', async () => {
    const monsters = await myServerPrisma.s_monster.findMany()
    
    const droppableMobs = await myServerPrisma.s_mob.findMany({
      select: {
        monster_type: true
      },
      distinct: ['monster_type']
    })
    
    const droppableTypes = new Set(droppableMobs.map(m => m.monster_type))
    
    const list = monsters.map(monster => ({
      ...monster,
      is_droppable: droppableTypes.has(monster.type)
    }))
    
    return list
  })
}