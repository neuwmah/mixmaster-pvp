import { FastifyInstance } from 'fastify'
import { myServerPrisma } from '../db.js'

export async function henchRoutes(app: FastifyInstance) {
  app.get('/hench', async () => {
    const where: any = {}
    where.start_base_level = { gt: 250 }
    const list = await myServerPrisma.s_monster.findMany({ where })
    return list
  })
}