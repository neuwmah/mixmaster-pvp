import { FastifyInstance } from 'fastify'
import { myServerPrisma } from '../db.js'

export async function henchRoutes(app: FastifyInstance) {
  app.get('/hench', async () => {
    const list = await myServerPrisma.s_monster.findMany({
      where: {
        OR: [
          { start_base_level: { gt: 250 } },
          { name: { contains: 'CyberHare' } }
        ]
      }
    })
    return list
  })
}