import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma, myGamePrisma, myMemberPrisma } from '../db.js'

const bodySchema = z.object({
  userId: z.string().optional(),
  name: z.string().min(3).max(12),
  class: z.enum(['ditt', 'jin', 'penril', 'phoy']),
  energy: z.number().int().min(10).max(2500).default(0),
  agility: z.number().int().min(10).max(2500).default(0),
  accuracy: z.number().int().min(10).max(2500).default(0),
  luck: z.number().int().min(10).max(2500).default(0),
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
            let heroType = 0
            if (parsed.data.class == 'ditt') heroType = 0
            if (parsed.data.class == 'jin') heroType = 1
            if (parsed.data.class == 'penril') heroType = 2
            if (parsed.data.class == 'phoy') heroType = 3
            while (attempt < MAX_ATTEMPTS) {
              const serial = genSerial()
              try {
                created = await myGamePrisma.u_hero.create({
                  data: {
                    serial,
                    id_idx,
                    hero_order: heroOrder as number,
                    hero_type: heroType,
                    name: parsed.data.name,
                    str: parsed.data.energy,
                    dex: parsed.data.agility,
                    aim: parsed.data.accuracy,
                    luck: parsed.data.luck
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

  app.delete('/characters/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    try {
      const char = await prisma.character.findUnique({ where: { id }, include: { user: true } })
      if (!char) return reply.code(404).send({ message: 'Not found' })
      if (char.transferPending) return reply.code(409).send({ message: 'Character in transfer pending state.' })

      let id_idx: number | null = null
      let hero_order: number = 0
      
      if (char.user?.username) {
        const player = await myMemberPrisma.player.findUnique({ where: { PlayerID: char.user.username }, select: { id_idx: true } }).catch(() => null)
        if (player && player.id_idx !== null && player.id_idx !== undefined) {
          id_idx = player.id_idx
          
          const userChars = await prisma.character.findMany({ 
            where: { userId: char.userId }, 
            orderBy: { created_at: 'asc' },
            select: { id: true }
          })
          hero_order = userChars.findIndex(c => c.id === char.id)
          if (hero_order === -1) hero_order = 0
        }
      }

      if (id_idx !== null) {
        try {
          const lastDigit = Math.abs(Number(id_idx)) % 10
          const henchTableName = `u_hench_${lastDigit}`
          const henchModel = (myGamePrisma as any)[henchTableName]
          
          if (henchModel && typeof henchModel.deleteMany === 'function') {
            await henchModel.deleteMany({ 
              where: { 
                id_idx,
                hero_order
              } 
            })
          }

          await myGamePrisma.u_hero.deleteMany({
            where: {
              id_idx,
              hero_order
            }
          }).catch(() => null)
        } catch (e) {
          console.error('Error deleting game data:', e)
        }
      }

      await prisma.character.delete({ where: { id } })
      return reply.code(204).send()
    } catch (e: any) {
      console.error('Character deletion error:', e)
      return reply.code(500).send({ message: 'Error deleting character' })
    }
  })

  /* Need to update */
  app.get('/characters/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const item = await prisma.character.findUnique({ where: { id }, include: { user: true, guild: true } })
    if (!item) return reply.code(404).send({ message: 'Not found' })
    if (item.user) (item as any).user.password = undefined
    return item
  })
  
  /* Need to update */
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
}
