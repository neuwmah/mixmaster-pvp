import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../db.js'
import path from 'node:path'
import fs from 'node:fs'

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

  app.post('/changelog/:id/image', async (req, reply) => {
    try {
      if (!(app as any).jwt) {
        console.error('JWT plugin not registered when handling upload')
        return reply.code(500).send({ message: 'jwt not ready' })
      }
      const auth = req.headers.authorization
      if (!auth) return reply.code(401).send({ message: 'unauthorized' })
      const token = auth.split(' ')[1]
      let payload: any
      try { payload = (app as any).jwt.verify(token) } catch (err) {
        console.error('verify failed', (err as any)?.message)
        return reply.code(401).send({ message: 'invalid token' })
      }
      if (!payload?.is_admin) return reply.code(403).send({ message: 'forbidden' })

      const { id } = req.params as { id: string }
      const file = await (req as any).file()
      if (!file) return reply.code(400).send({ message: 'file required' })
      if (!file.mimetype.startsWith('image/')) return reply.code(400).send({ message: 'invalid mimetype' })

      const ext = path.extname(file.filename) || '.' + (file.mimetype.split('/')[1] || 'png')
      const dir = path.join(process.cwd(), 'uploads', 'changelog')
      fs.mkdirSync(dir, { recursive: true })
      const name = `${Date.now()}-${Math.round(Math.random()*1e6)}${ext}`
      const filepath = path.join(dir, name)
      const buf = await file.toBuffer()
      fs.writeFileSync(filepath, buf)
      const publicPath = `/uploads/changelog/${name}`

      const updated = await prisma.changelog.update({ where: { id }, data: { image_src: publicPath } })
      return updated
    } catch (e) {
      console.error('upload error', (e as any)?.message)
      return reply.code(500).send({ message: 'upload failed' })
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
