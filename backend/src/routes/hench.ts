import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../db.js'

const createSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  type: z.enum([
    'dragon', 'beast', 'insect', 'metal',
    'mystery', 'devil', 'bird', 'plant'
  ]),
  base_level: z.number().int().min(1).default(1).optional(),
  base_exp: z.number().int().min(0).default(0).optional(),
  sprite_url: z.string().optional(),
  icon_url: z.string().optional(),
  active: z.boolean().optional()
})

export async function henchRoutes(app: FastifyInstance) {
  app.get('/hench', async (req) => {
    const q: any = (req.query || {})
    const activeParam = typeof q.active === 'string' ? q.active : undefined
    const where: any = {}
    if (activeParam === 'true') where.active = true
    else if (activeParam === 'false') where.active = false
    const list = await prisma.hench.findMany({ where, orderBy: { created_at: 'desc' } })
    return list
  })

  app.get('/hench/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const item = await prisma.hench.findUnique({ where: { id } })
    if (!item) return reply.code(404).send({ message: 'not found' })
    return item
  })

  app.post('/hench', async (req, reply) => {
    const parsed = createSchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    try {
      const created = await prisma.hench.create({ data: parsed.data })
      return reply.code(201).send(created)
    } catch (e: any) {
      if (e.code === 'P2002') return reply.code(409).send({ message: 'code already exists' })
      return reply.code(500).send({ message: 'internal error' })
    }
  })

  app.put('/hench/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const parsed = createSchema.partial().refine(d => Object.keys(d).length > 0, { message: 'empty body' }).safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    try {
      const updated = await prisma.hench.update({ where: { id }, data: parsed.data })
      return updated
    } catch (e: any) {
      if (e.code === 'P2002') return reply.code(409).send({ message: 'code already exists' })
      return reply.code(404).send({ message: 'not found' })
    }
  })

  app.delete('/hench/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const petCount = await prisma.pet.count({ where: { henchId: id } })
    if (petCount > 0) return reply.code(409).send({ message: 'cannot delete hench with existing pets' })
    try {
      await prisma.hench.delete({ where: { id } })
      return reply.code(204).send()
    } catch {
      return reply.code(404).send({ message: 'not found' })
    }
  })

  app.post('/hench/:id/activate', async (req, reply) => {
    const { id } = req.params as { id: string }
    try {
      const updated = await prisma.hench.update({ where: { id }, data: { active: true } })
      return updated
    } catch { return reply.code(404).send({ message: 'not found' }) }
  })

  app.post('/hench/:id/deactivate', async (req, reply) => {
    const { id } = req.params as { id: string }
    try {
      const updated = await prisma.hench.update({ where: { id }, data: { active: false } })
      return updated
    } catch { return reply.code(404).send({ message: 'not found' }) }
  })
}