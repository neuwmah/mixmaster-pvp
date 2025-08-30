import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../db.js'

const bodySchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1).refine(v => v.startsWith('/') || /^https?:\/\//.test(v), 'Invalid url')
})

export async function menusRoutes(app: FastifyInstance) {
  app.post('/menus', async (req, reply) => {
    const parsed = bodySchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    const menu = await prisma.menu.create({ data: parsed.data })
    return reply.code(201).send(menu)
  })

  app.get('/menus', async () => {
    return prisma.menu.findMany({ orderBy: { created_at: 'desc' } })
  })

  app.get('/menus/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const menu = await prisma.menu.findUnique({ where: { id } })
    if (!menu) return reply.code(404).send({ message: 'Not found' })
    return menu
  })

  app.put('/menus/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const parsed = bodySchema.partial().refine(d => Object.keys(d).length > 0, { message: 'Empty body' }).safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    try {
      const updated = await prisma.menu.update({ where: { id }, data: parsed.data })
      return updated
    } catch {
      return reply.code(404).send({ message: 'Not found' })
    }
  })

  app.delete('/menus/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    try {
      await prisma.menu.delete({ where: { id } })
      return reply.code(204).send()
    } catch {
      return reply.code(404).send({ message: 'Not found' })
    }
  })
}
