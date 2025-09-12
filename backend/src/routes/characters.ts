import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma, myGamePrisma, myMemberPrisma } from '../db.js'

const bodySchema = z.object({
  userId: z.string().optional(),
  name: z.string().min(3).max(12),
  class: z.enum(['ditt', 'jin', 'penril', 'phoy']),
  energy: z.number().int().min(10).max(500).default(0),
  agility: z.number().int().min(10).max(500).default(0),
  accuracy: z.number().int().min(10).max(500).default(0),
  luck: z.number().int().min(10).max(500).default(0),
  map: z.string().min(1).default('magirita')
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
        return reply.code(409).send({ message: 'User already has the maximum of 3 characters' })
      }
    }

    try {
      const item = await prisma.character.create({ data: parsed.data })
      if (parsed.data.userId) {
        try {
          const pgUser = await prisma.user.findUnique({ where: { id: parsed.data.userId } })
          let id_idx: number | null = null
          if (pgUser?.username) {
            const player = await myMemberPrisma.player.findUnique({ where: { PlayerID: pgUser.username }, select: { id_idx: true } })
            if (player) id_idx = player.id_idx ?? null
          }

          const chars = await prisma.character.findMany({ where: { userId: parsed.data.userId }, select: { id: true } })
          const existing = chars.length - 1
          let heroOrder = Math.min(existing, 2)

          if (id_idx !== null) {
            const genSerial = () => {
              const ts = BigInt(Date.now())
              const rand = BigInt(Math.floor(Math.random() * 1_000_000))
              return ts * 1000000n + rand
            }

            const MAX_ATTEMPTS = 10
            let attempt = 0
            let created: any = null
            while (attempt < MAX_ATTEMPTS) {
              const serial = genSerial()
              try {
                created = await myGamePrisma.u_hero.create({
                  data: {
                    id_idx,
                    hero_order: heroOrder as number,
                    serial,
                    name: parsed.data.name,
                    hero_type: 0
                  }
                })
                break
              } catch (e: any) {
                if (e?.code === 'P2002') {
                  const target = e?.meta?.target
                  if (!target || (Array.isArray(target) && target.includes('serial'))) {
                    attempt++
                    continue
                  }
                  await prisma.character.delete({ where: { id: item.id } }).catch(() => {})
                  return reply.code(409).send({ message: 'db unique constraint', target: (e.meta as any)?.target })
                }
                await prisma.character.delete({ where: { id: item.id } }).catch(() => {})
                return reply.code(500).send({ message: 'Internal error' })
              }
            }
            if (!created) {
              await prisma.character.delete({ where: { id: item.id } }).catch(() => {})
              return reply.code(500).send({ message: 'Could not create game hero' })
            }
          }
        } catch (e) {
          await prisma.character.delete({ where: { id: item.id } }).catch(() => {})
          return reply.code(500).send({ message: 'Internal error' })
        }
      }

      return reply.code(201).send(item)
    } catch (e: any) {
      if (e.code === 'P2002') {
        return reply.code(409).send({ message: 'Character name already in use' })
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
