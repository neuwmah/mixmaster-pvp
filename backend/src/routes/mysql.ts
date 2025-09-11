import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { myPrisma } from '../db.js'

const createSchema = z.object({
  email: z.string().email(),
  name: z.string().optional()
})

function convertBigInt(v: any): any {
  if (typeof v === 'bigint') return v.toString()
  if (Array.isArray(v)) return v.map(convertBigInt)
  if (v && typeof v === 'object') {
    const out: any = {}
    for (const k of Object.keys(v)) out[k] = convertBigInt(v[k])
    return out
  }
  return v
}

export async function mysqlRoutes(app: FastifyInstance) {
  app.addHook('preSerialization', (_req, _reply, payload, done) => {
    done(null, convertBigInt(payload))
  })

  app.post('/mysql/u_hero', async (req, reply) => {
    const parsed = createSchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    try {
      const u_hero = await myPrisma.u_hero.create({ data: parsed.data })
      return reply.code(201).send(u_hero)
    } catch (e: any) {
      if (e.code === 'P2002') return reply.code(409).send({ message: 'email already exists' })
      return reply.code(500).send({ message: 'internal error' })
    }
  })

  app.get('/mysql/u_hero', async () => {
    return myPrisma.u_hero.findMany()
  })

  app.get('/mysql/u_hench_0', async () => {
    return myPrisma.u_hench_0.findMany()
  })
}