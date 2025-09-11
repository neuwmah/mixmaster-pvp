import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../db.js'
import { Prisma } from '@prisma/client'

const bodySchema = z.object({
  userId: z.string().optional(),
  name: z.string().min(3).max(12),
  class: z.enum(['ditt', 'jin', 'penril', 'phoy']),
  energy: z.number().int().min(10).max(500).default(0),
  agility: z.number().int().min(10).max(500).default(0),
  accuracy: z.number().int().min(10).max(500).default(0),
  luck: z.number().int().min(10).max(500).default(0),
  map: z.string().min(1).default('magirita'),
  u_hero_id_idx: z.number().int().default(0),
  u_hero_order: z.number().int().default(0)
})

const transferInitSchema = z.object({
  targetUserId: z.string()
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
      if (e.code === 'P2002') {
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

    const current = await prisma.character.findUnique({ where: { id } })
    if (!current) return reply.code(404).send({ message: 'Not found' })
    if (current.transferPending) return reply.code(409).send({ message: 'Character in transfer pending state.' })

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
      if (e.code === 'P2002') {
        return reply.code(409).send({ message: 'Character name already in use.' })
      }
      return reply.code(404).send({ message: 'Not found' })
    }
  })

  app.post('/characters/:id/transfer/init', async (req, reply) => {
    const { id } = req.params as { id: string }
    const parsed = transferInitSchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ message: 'Invalid data', errors: parsed.error.flatten() })
    const { targetUserId } = parsed.data
    const char = await prisma.character.findUnique({ where: { id } })
    if (!char) return reply.code(404).send({ message: 'Not found' })
    if (char.transferPending) return reply.code(409).send({ message: 'Transfer already pending.' })
    if (char.userId === targetUserId) return reply.code(409).send({ message: 'Character already belongs to this user.' })
    const targetCount = await prisma.character.count({ where: { userId: targetUserId } })
    if (targetCount >= 3) return reply.code(409).send({ message: 'Target user already has the maximum of 3 characters.' })
    const updated = await prisma.character.update({ where: { id }, data: { transferPending: true, transferTargetUserId: targetUserId, transferRequestedAt: new Date() } })
    return updated
  })

  app.post('/characters/:id/transfer/cancel', async (req, reply) => {
    const { id } = req.params as { id: string }
    const char = await prisma.character.findUnique({ where: { id } })
    if (!char) return reply.code(404).send({ message: 'Not found' })
    if (!char.transferPending) return reply.code(409).send({ message: 'No transfer pending.' })
    const updated = await prisma.character.update({ where: { id }, data: { transferPending: false, transferTargetUserId: null, transferRequestedAt: null } })
    return updated
  })

  app.post('/characters/:id/transfer/reject', async (req, reply) => {
    const { id } = req.params as { id: string }
    const char = await prisma.character.findUnique({ where: { id } })
    if (!char) return reply.code(404).send({ message: 'Not found' })
    if (!char.transferPending) return reply.code(409).send({ message: 'No transfer pending.' })
    const updated = await prisma.character.update({ where: { id }, data: { transferPending: false, transferTargetUserId: null, transferRequestedAt: null } })
    return updated
  })

  app.post('/characters/:id/transfer/accept', async (req, reply) => {
    const { id } = req.params as { id: string }
    const char = await prisma.character.findUnique({ where: { id } })
    if (!char) return reply.code(404).send({ message: 'Not found' })
    if (!char.transferPending || !char.transferTargetUserId) return reply.code(409).send({ message: 'No transfer pending.' })
    const targetCount = await prisma.character.count({ where: { userId: char.transferTargetUserId, NOT: { id } } })
    if (targetCount >= 3) return reply.code(409).send({ message: 'Target user already has the maximum of 3 characters.' })
    const updated = await prisma.character.update({ where: { id }, data: { userId: char.transferTargetUserId, transferPending: false, transferTargetUserId: null, transferRequestedAt: null } })
    return updated
  })

  app.get('/characters/pending/:userId', async (req) => {
    const { userId } = req.params as { userId: string }
    const list = await prisma.character.findMany({ where: { transferPending: true, transferTargetUserId: userId } })
    return list
  })

  app.get('/characters', async () => {
    const list = await prisma.character.findMany({ include: { user: true, guild: true, pets: { include: { hench: true } } } })
    return list.map((c: any) => c.user ? { ...c, user: { ...c.user, password: undefined } } : c)
  })

  app.get('/characters/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const item = await prisma.character.findUnique({ where: { id }, include: { user: true, guild: true, pets: { include: { hench: true } } } })
    if (!item) return reply.code(404).send({ message: 'Not found' })
    if (item.user) (item as any).user.password = undefined
    return item
  })

  app.delete('/characters/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    try {
      const char = await prisma.character.findUnique({ where: { id } })
      if (!char) return reply.code(404).send({ message: 'Not found' })
      if (char.transferPending) return reply.code(409).send({ message: 'Character in transfer pending state.' })
      await prisma.character.delete({ where: { id } })
      return reply.code(204).send()
    } catch {
      return reply.code(404).send({ message: 'Not found' })
    }
  })
}
