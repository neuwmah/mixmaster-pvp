import { FastifyInstance } from 'fastify'
import { prisma } from '../db.js'

export async function rankRoutes(app: FastifyInstance) {
  app.get('/rankpvp', async () => {
    const chars = await prisma.character.findMany({
      where: {
        kills_count: {
          gte: 1,
        },
      },
      select: {
        id: true,
        name: true,
        kills_count: true,
        guild: { select: { id: true, name: true } }
      },
      orderBy: { kills_count: 'desc' },
      take: 5
    })
    return chars
  })

  app.get('/ranksa', async () => {
    const guilds = await prisma.guild.findMany({
      where: {
        castles_count: {
          gte: 1,
        },
      },
      select: {
        id: true,
        name: true,
        castles_count: true,
        master: { select: { id: true, name: true, class: true } }
      },
      orderBy: { castles_count: 'desc' },
      take: 3
    })

    return guilds.map((g: { id: string; name: string; castles_count: number; master: { id: string; name: string; class: string } | null }) => ({
      id: g.id,
      guild: { id: g.id, name: g.name, castles_count: g.castles_count },
      master: g.master ? { id: g.master.id, name: g.master.name, class: g.master.class } : null
    }))
  })
}
