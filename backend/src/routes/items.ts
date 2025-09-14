import { FastifyInstance } from 'fastify'
import { myServerPrisma } from '../db.js'

export async function itemsRoutes(app: FastifyInstance) {
  app.get('/items', async () => {
    const where: any = {}
    where.require_level = { gt: 230 }
    where.equip_part0 = { in: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    where.AND = [
      { name: { not: { contains: '[S]' } } },
      { name: { not: { contains: '[FStep]' } } }
    ]
    const list = await myServerPrisma.s_item.findMany({
      where,
      orderBy: [
        { require_level: 'desc' },
        { name: 'asc' }
      ]
    })
    return list
  })
}