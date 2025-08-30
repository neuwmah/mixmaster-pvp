import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../db.js'

const bodySchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  image_src: z.string().min(1).refine(v => v.startsWith('/') || /^https?:\/\//.test(v), 'Invalid url'),
  content1: z.string().optional(),
  content2: z.string().optional()
})

export async function changelogRoutes(app: FastifyInstance) {
  app.post('/changelog', async (req, reply) => {
    const parsed = bodySchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    const item = await prisma.changelog.create({ data: parsed.data })
    return reply.code(201).send(item)
  })

  app.get('/changelog', async () => {
    return prisma.changelog.findMany({ orderBy: { created_at: 'desc' } })
  })

  app.get('/changelog/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const item = await prisma.changelog.findUnique({ where: { id } })
    if (!item) return reply.code(404).send({ message: 'Not found' })
    return item
  })

  app.put('/changelog/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const parsed = bodySchema.partial().refine(d => Object.keys(d).length > 0, { message: 'Empty body' }).safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    try {
      const updated = await prisma.changelog.update({ where: { id }, data: parsed.data })
      return updated
    } catch {
      return reply.code(404).send({ message: 'Not found' })
    }
  })

  app.delete('/changelog/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    try {
      await prisma.changelog.delete({ where: { id } })
      return reply.code(204).send()
    } catch {
      return reply.code(404).send({ message: 'Not found' })
    }
  })
}
