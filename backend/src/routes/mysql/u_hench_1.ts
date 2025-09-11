import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { myGamePrisma } from '../../db.js'

const createSchema = z.object({
  id_idx: z.number().int().min(1)
})

function toMySqlDateTime(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  const yyyy = d.getFullYear()
  const MM = pad(d.getMonth() + 1)
  const dd = pad(d.getDate())
  const hh = pad(d.getHours())
  const mm = pad(d.getMinutes())
  const ss = pad(d.getSeconds())
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`
}

function convertData(v: any): any {
  if (typeof v === 'bigint') return v.toString()
  if (v instanceof Date) return toMySqlDateTime(v)
  if (Array.isArray(v)) return v.map(convertData)
  if (v && typeof v === 'object') {
    const out: any = {}
    for (const k of Object.keys(v)) out[k] = convertData(v[k])
    return out
  }
  return v
}

export async function u_hench_1Routes(app: FastifyInstance) {
  app.addHook('preSerialization', (_req, _reply, payload, done) => {
    done(null, convertData(payload))
  })

  app.post('/mysql/u_hench_1', async (req, reply) => {
    const parsed = createSchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    try {
      const u_hench_1 = await myGamePrisma.u_hench_1.create({ data: parsed.data })
      return reply.code(201).send(u_hench_1)
    } catch (e: any) {
      if (e.code === 'P2002') return reply.code(409).send({ message: 'db error' })
      return reply.code(500).send({ message: 'internal error' })
    }
  })

  app.get('/mysql/u_hench_1', async () => {
    return myGamePrisma.u_hench_1.findMany({
      select: {
        id_idx: true,
        hero_order: true,
        monster_type: true,
        name: true,
        sex: true
      }
    })
  })
}