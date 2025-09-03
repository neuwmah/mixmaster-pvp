import { FastifyInstance } from 'fastify'
import { prisma } from '../db.js'
import { z } from 'zod'
import crypto from 'node:crypto'
import { Prisma } from '@prisma/client'
import jwt from '@fastify/jwt'

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

const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(3).optional(),
  currentPassword: z.string().optional()
}).refine(d => {
  const keys = Object.keys(d).filter(k => k !== 'currentPassword')
  return keys.length > 0
}, { message: 'empty body' })

function hash(pw: string) {
  return crypto.createHash('sha256').update(pw).digest('hex')
}

export async function userRoutes(app: FastifyInstance) {
  if (!app.hasDecorator('jwt')) {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET missing')
    await app.register(jwt, { secret: process.env.JWT_SECRET })
  }

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

  app.put('/users/:id', async (req, reply) => {
    try {
      const auth = req.headers.authorization
      if (!auth) return reply.code(401).send({ message: 'unauthorized' })
      const token = auth.split(' ')[1]
      let payload: any
      try {
        payload = (app as any).jwt.verify(token)
      } catch (err) {
        return reply.code(401).send({ message: 'invalid token' })
      }

      const { id } = req.params as { id: string }
      if (payload.userId !== id && !payload.is_admin) return reply.code(403).send({ message: 'forbidden' })

      const parsed = userUpdateSchema.safeParse(req.body)
      if (!parsed.success) return reply.code(400).send({ message: 'invalid data', errors: parsed.error.flatten() })

      const targetUser = await prisma.user.findUnique({ where: { id } })
      if (!targetUser) return reply.code(404).send({ message: 'not found' })

      const wantsSensitiveChange = ['email','phone','password'].some(f => (parsed.data as any)[f] !== undefined)
      const isAdmin = !!payload.is_admin
      if (wantsSensitiveChange && !isAdmin) {
        const provided = parsed.data.currentPassword
        if (!provided) return reply.code(400).send({ message: 'current password required' })
        if (targetUser.password !== hash(provided)) return reply.code(401).send({ message: 'invalid current password' })
      }

      const data: any = {}
      if (parsed.data.email !== undefined) data.email = parsed.data.email
      if (parsed.data.phone !== undefined) data.phone = parsed.data.phone?.trim() === '' ? null : parsed.data.phone
      if (parsed.data.password !== undefined) data.password = hash(parsed.data.password)

      try {
        const updated = await prisma.user.update({ where: { id }, data })
        return { ...updated, password: undefined }
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
          return reply.code(409).send({ message: 'unique constraint', target: (e.meta as any)?.target })
        }
        return reply.code(404).send({ message: 'not found' })
      }
    } catch (e) {
      console.error('update user error', (e as any)?.message)
      return reply.code(500).send({ message: 'internal error' })
    }
  })
}
