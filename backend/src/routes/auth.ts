import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../db.js'
import crypto from 'node:crypto'
import jwt from '@fastify/jwt'

const loginSchema = z.object({ username: z.string(), password: z.string() })

function hash(pw: string) { return crypto.createHash('sha256').update(pw).digest('hex') }

export async function authRoutes(app: FastifyInstance) {
  if (!app.hasDecorator('jwt')) {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET missing');
    await app.register(jwt, { secret: process.env.JWT_SECRET });
  }

  app.post('/auth/login', async (req, reply) => {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    const { username, password } = parsed.data
    const user = await prisma.user.findUnique({ where: { username } })
    if (!user || user.password !== hash(password)) return reply.code(401).send({ message: 'invalid credentials' })
    const isAdmin = (user as any).is_admin
    const token = app.jwt.sign({ userId: user.id, username: user.username, is_admin: isAdmin }, { expiresIn: '1h' })
    return { token, is_admin: isAdmin }
  })

  app.get('/auth/me', async (req, reply) => {
    try {
      const auth = req.headers.authorization
      if (!auth) return reply.code(401).send({ message: 'no token' })
      const token = auth.split(' ')[1]
      const payload = app.jwt.verify<{ userId: string }>(token)
      const user = await prisma.user.findUnique({ where: { id: payload.userId }, include: { characters: true } })
      if (!user) return reply.code(404).send({ message: 'not found' })
      return { ...user, password: undefined }
    } catch (e) {
      console.error('auth/me error', (e as any)?.message)
      return reply.code(401).send({ message: 'invalid token' })
    }
  })
}
