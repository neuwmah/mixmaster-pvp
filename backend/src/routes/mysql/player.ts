import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { myMemberPrisma } from '../../db.js'
import { convertData } from './_data.js'

const createSchema = z.object({
  id_idx: z.number().int().min(1)
})

export async function playerRoutes(app: FastifyInstance) {
  app.addHook('preSerialization', (_req, _reply, payload, done) => {
    done(null, convertData(payload))
  })

  app.post('/mysql/player', async (req, reply) => {
    const parsed = createSchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    try {
      const player = await myMemberPrisma.player.create({ data: parsed.data })
      return reply.code(201).send(player)
    } catch (e: any) {
      if (e.code === 'P2002') return reply.code(409).send({ message: 'db error' })
      return reply.code(500).send({ message: 'internal error' })
    }
  })

  app.get('/mysql/player', async () => {
    return myMemberPrisma.player.findMany({
      select: {
        id_idx: true,
        PlayerID: true
      }
    })
  })
}