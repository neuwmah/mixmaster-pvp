import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../db.js'

const createSchema = z.object({
  characterId: z.string(),
  henchId: z.string(),
  nickname: z.string().optional(),
  in_party: z.boolean().optional(),
  slot: z.number().int().min(0).nullable().optional()
})

const createManySchema = z.array(createSchema).min(1).max(20)

const updateSchema = z.object({
  nickname: z.string().optional(),
  in_party: z.boolean().default(true).optional(),
  slot: z.number().int().min(0).nullable().optional(),
  level: z.number().int().min(1).max(999).optional(),
  exp: z.number().int().min(0).optional()
}).refine(d => Object.keys(d).length > 0, { message: 'empty body' })

export async function petRoutes(app: FastifyInstance) {
  app.get('/pets', async (req) => {
    const q: any = req.query || {}
    const characterId = typeof q.characterId === 'string' ? q.characterId : undefined
    const where: any = {}
    if (characterId) where.characterId = characterId
    return prisma.pet.findMany({ where, include: { hench: true } })
  })

  app.get('/pets/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const item = await prisma.pet.findUnique({ where: { id }, include: { hench: true, character: { select: { id: true, name: true } } } })
    if (!item) return reply.code(404).send({ message: 'not found' })
    return item
  })

  app.post('/pets/bulk', async (req, reply) => {
    const parsed = createManySchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    const data = parsed.data

    const characterIds = Array.from(new Set(data.map(d => d.characterId)))
    const characters = await prisma.character.findMany({ where: { id: { in: characterIds } }, select: { id: true } })
    if (characters.length !== characterIds.length) return reply.code(404).send({ message: 'one or more characters not found' })

    const henchIds = Array.from(new Set(data.map(d => d.henchId)))
    const henches = await prisma.hench.findMany({ where: { id: { in: henchIds }, active: true } })
    if (henches.length !== henchIds.length) return reply.code(404).send({ message: 'one or more hench not found or inactive' })

    const henchMap: Record<string, { base_level: number; base_exp: number }> = {}
    henches.forEach(h => henchMap[h.id] = { base_level: h.base_level, base_exp: h.base_exp })

    const created: any[] = []
    for (const item of data) {
      const h = henchMap[item.henchId]
      const pet = await prisma.pet.create({
        data: {
          characterId: item.characterId,
          henchId: item.henchId,
          nickname: item.nickname,
          level: h.base_level,
          exp: h.base_exp,
          in_party: item.in_party ?? false,
          slot: item.slot ?? null
        },
        include: { hench: true }
      })
      created.push(pet)
    }

    return reply.code(201).send(created)
  })

  app.post('/pets', async (req, reply) => {
    const parsed = createSchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    const { characterId, henchId, nickname, in_party, slot } = parsed.data

    const character = await prisma.character.findUnique({ where: { id: characterId } })
    if (!character) return reply.code(404).send({ message: 'character not found' })
    const hench = await prisma.hench.findUnique({ where: { id: henchId, active: true } })
    if (!hench) return reply.code(404).send({ message: 'hench hench not found' })

    const created = await prisma.pet.create({ data: { characterId, henchId, nickname, level: hench.base_level, exp: hench.base_exp, in_party: in_party ?? false, slot: slot ?? null }, include: { hench: true } })
    return reply.code(201).send(created)
  })

  app.put('/pets/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const parsed = updateSchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    try {
      const updated = await prisma.pet.update({ where: { id }, data: parsed.data, include: { hench: true } })
      return updated
    } catch {
      return reply.code(404).send({ message: 'not found' })
    }
  })

  app.delete('/pets/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    try {
      await prisma.pet.delete({ where: { id } })
      return reply.code(204).send()
    } catch {
      return reply.code(404).send({ message: 'not found' })
    }
  })
}