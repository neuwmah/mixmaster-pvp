import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../db.js'

const bodySchema = z.object({
  userId: z.string().optional(),
  name: z.string().min(1),
  class: z.string().min(1),
})

export async function characterRoutes(app: FastifyInstance) {
  app.post('/characters', async (req, reply) => {
    const parsed = bodySchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    const item = await prisma.character.create({ data: parsed.data })
    return reply.code(201).send(item)
  })

  app.get('/characters', async () => {
    const list = await prisma.character.findMany({ include: { user: true, guild: true } })
    return list.map((c: any) => c.user ? { ...c, user: { ...c.user, password: undefined } } : c)
  })

  app.get('/characters/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const item = await prisma.character.findUnique({ where: { id }, include: { user: true, guild: true } })
    if (!item) return reply.code(404).send({ message: 'Not found' })
    if (item.user) (item as any).user.password = undefined
    return item
  })

  app.put('/characters/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const parsed = bodySchema.partial().refine(d => Object.keys(d).length > 0, { message: 'Empty body' }).safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    try {
      const updated = await prisma.character.update({ where: { id }, data: parsed.data })
      return updated
    } catch {
      return reply.code(404).send({ message: 'Not found' })
    }
  })

  app.delete('/characters/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    try {
      await prisma.character.delete({ where: { id } })
      return reply.code(204).send()
    } catch {
      return reply.code(404).send({ message: 'Not found' })
    }
  })
}
