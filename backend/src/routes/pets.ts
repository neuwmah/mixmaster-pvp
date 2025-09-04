import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../db.js'

const createSchema = z.object({
  characterId: z.string(),
  templateId: z.string(),
  nickname: z.string().optional()
})

const updateSchema = z.object({
  nickname: z.string().optional(),
  in_party: z.boolean().optional(),
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
    return prisma.pet.findMany({ where, include: { template: true } })
  })

  app.get('/pets/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const item = await prisma.pet.findUnique({ where: { id }, include: { template: true, character: { select: { id: true, name: true } } } })
    if (!item) return reply.code(404).send({ message: 'not found' })
    return item
  })

  app.post('/pets', async (req, reply) => {
    const parsed = createSchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    const { characterId, templateId, nickname } = parsed.data

    const character = await prisma.character.findUnique({ where: { id: characterId } })
    if (!character) return reply.code(404).send({ message: 'character not found' })
    const template = await prisma.hench.findUnique({ where: { id: templateId, active: true } })
    if (!template) return reply.code(404).send({ message: 'hench template not found' })

    const created = await prisma.pet.create({ data: { characterId, templateId, nickname, level: template.base_level, exp: template.base_exp }, include: { template: true } })
    return reply.code(201).send(created)
  })

  app.put('/pets/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const parsed = updateSchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    try {
      const updated = await prisma.pet.update({ where: { id }, data: parsed.data, include: { template: true } })
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