import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../db.js'
import { Prisma } from '@prisma/client'

const bodySchema = z.object({
  userId: z.string().optional(),
  name: z.string().min(3).max(16),
  class: z.enum(['ditt', 'jin', 'penril', 'phoy']),
  energy: z.number().int().min(10).max(500).default(0),
  agility: z.number().int().min(10).max(500).default(0),
  accuracy: z.number().int().min(10).max(500).default(0),
  luck: z.number().int().min(10).max(500).default(0),
  map: z.string().min(1).default('magirita'),
})

export async function characterRoutes(app: FastifyInstance) {
  app.post('/characters', async (req, reply) => {
    const parsed = bodySchema.safeParse(req.body)
    if (!parsed.success) {
      return reply.code(400).send({ message: 'Invalid data', errors: parsed.error.flatten() })
    }

    if (parsed.data.userId) {
      const count = await prisma.character.count({ where: { userId: parsed.data.userId } })
      if (count >= 3) {
        return reply.code(409).send({ message: 'User already has the maximum of 3 characters.' })
      }
    }

    try {
      const item = await prisma.character.create({ data: parsed.data })
      return reply.code(201).send(item)
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        return reply.code(409).send({ message: 'Character name already in use.' })
      }
      return reply.code(500).send({ message: 'Internal error' })
    }
  })

  app.put('/characters/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const parsed = bodySchema.partial().refine(d => Object.keys(d).length > 0, { message: 'Empty body' }).safeParse(req.body)
    if (!parsed.success) {
      return reply.code(400).send({ message: 'Invalid data', errors: parsed.error.flatten() })
    }

    if (parsed.data.userId) {
      const count = await prisma.character.count({ where: { userId: parsed.data.userId, NOT: { id } } })
      if (count >= 3) {
        return reply.code(409).send({ message: 'Target user already has the maximum of 3 characters.' })
      }
    }

    try {
      const updated = await prisma.character.update({ where: { id }, data: parsed.data })
      return updated
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        return reply.code(409).send({ message: 'Character name already in use.' })
      }
      return reply.code(404).send({ message: 'Not found' })
    }
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
