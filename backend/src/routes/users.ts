import { FastifyInstance } from 'fastify'
import { prisma } from '../db.js'
import { z } from 'zod'
import crypto from 'node:crypto'
import { Prisma } from '@prisma/client'

const userCreateSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional()
})

const userLoginSchema = z.object({
  username: z.string(),
  password: z.string()
})

function hash(pw: string) {
  return crypto.createHash('sha256').update(pw).digest('hex')
}

export async function userRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.user.findMany({ include: { characters: true } })
    return users.map((u: any) => ({ ...u, password: undefined }))
  })

  app.get('/users/exists/:username', async (req) => {
    const { username } = req.params as { username: string }
    const user = await prisma.user.findUnique({ where: { username } })
    return { exists: !!user }
  })

  app.get('/users/:id', async (req, reply) => {
    const { id } = req.params as { id: string }
    const user = await prisma.user.findUnique({ where: { id }, include: { characters: true } })
    if (!user) return reply.code(404).send({ message: 'not found' })
    return { ...user, password: undefined }
  })

  app.post('/users', async (req, reply) => {
    const parse = userCreateSchema.safeParse(req.body)
    if (!parse.success) return reply.code(400).send({ errors: parse.error.flatten() })
    const data = parse.data
    const phone = data.phone?.trim() === '' ? undefined : data.phone?.trim()
    try {
      const user = await prisma.user.create({ data: { username: data.username, email: data.email, phone, password: hash(data.password) } })
      return reply.code(201).send({ ...user, password: undefined })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        return reply.code(409).send({ message: 'unique constraint', target: (e.meta as any)?.target })
      }
      console.error('create user error', e)
      return reply.code(500).send({ message: 'internal error' })
    }
  })

  app.post('/users/check', async (req, reply) => {
    const parse = userLoginSchema.safeParse(req.body)
    if (!parse.success) return reply.code(400).send({ errors: parse.error.flatten() })
    const { username, password } = parse.data
    const user = await prisma.user.findUnique({ where: { username } })
    if (!user) return reply.code(401).send({ message: 'invalid credentials' })
    if (user.password !== hash(password)) return reply.code(401).send({ message: 'invalid credentials' })
    return { id: user.id, username: user.username }
  })
}
