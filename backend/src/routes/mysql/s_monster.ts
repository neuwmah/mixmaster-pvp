import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { myServerPrisma } from '../../db.js'
import { convertData } from './_data.js'

const createSchema = z.object({
  type: z.number().int().min(1)
})

export async function s_monsterRoutes(app: FastifyInstance) {
  app.addHook('preSerialization', (_req, _reply, payload, done) => {
    done(null, convertData(payload))
  })

  app.post('/mysql/s_monster', async (req, reply) => {
    const parsed = createSchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    try {
      const s_monster = await myServerPrisma.s_monster.create({ data: parsed.data })
      return reply.code(201).send(s_monster)
    } catch (e: any) {
      if (e.code === 'P2002') return reply.code(409).send({ message: 'db error' })
      return reply.code(500).send({ message: 'internal error' })
    }
  })

  app.get('/mysql/s_monster', async () => {
    return myServerPrisma.s_monster.findMany()
  })
}