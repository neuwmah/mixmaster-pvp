import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../db.js'

const bodySchema = z.object({
  name: z.string().min(1),
  masterId: z.string().optional(),
  castles_count: z.number().int().min(0).default(0)
})

export async function guildRoutes(app: FastifyInstance) {
  app.post('/guilds', async (req, reply) => {
    const parsed = bodySchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    const item = await prisma.guild.create({ data: parsed.data })
    return reply.code(201).send(item)
  })

  app.get('/guilds', async () => {
    return prisma.guild.findMany({ include: { members: true, master: true } })
  })

  app.get('/guilds/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const item = await prisma.guild.findUnique({ where: { id }, include: { members: true, master: true } })
    if (!item) return reply.code(404).send({ message: 'Not found' })
    return item
  })

  app.put('/guilds/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const parsed = bodySchema.partial().refine(d => Object.keys(d).length > 0, { message: 'Empty body' }).safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    try {
      const updated = await prisma.guild.update({ where: { id }, data: parsed.data })
      return updated
    } catch {
      return reply.code(404).send({ message: 'Not found' })
    }
  })

  app.delete('/guilds/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    try {
      await prisma.guild.delete({ where: { id } })
      return reply.code(204).send()
    } catch {
      return reply.code(404).send({ message: 'Not found' })
    }
  })
}
