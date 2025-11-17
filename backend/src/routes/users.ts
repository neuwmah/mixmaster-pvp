import { FastifyInstance } from 'fastify'
import { myMemberPrisma, myGamePrisma } from '../db.js'
import { z } from 'zod'
import crypto from 'node:crypto'
import jwt from '@fastify/jwt'

const userCreateSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
  name: z.string().min(3),
  email: z.string().email()
})

const userLoginSchema = z.object({
  username: z.string(),
  password: z.string()
})

function hashPassword(password: string): string {
  const hash1 = crypto.createHash('sha1').update(password).digest()
  const hash2 = crypto.createHash('sha1').update(hash1).digest('hex')
  return '*' + hash2.toUpperCase()
}

export async function userRoutes(app: FastifyInstance) {
  if (!app.hasDecorator('jwt')) {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET missing')
    await app.register(jwt, { secret: process.env.JWT_SECRET })
  }

  app.post('/users', async (req, reply) => {
    const parsed = userCreateSchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    
    const { username, password, name, email } = parsed.data

    try {
      const existing = await myMemberPrisma.player.findUnique({ 
        where: { PlayerID: username } 
      })
      if (existing) {
        return reply.code(409).send({ message: 'Username already exists' })
      }

      const user = await myMemberPrisma.player.create({
        data: {
          PlayerID: username,
          Passwd: hashPassword(password),
          Name: name,
          Email: email,
          RegDate: new Date(),
          Access: 21,
          Block: 'ALLOW'
        }
      })

      return reply.code(201).send({
        id_idx: user.id_idx,
        PlayerID: user.PlayerID,
        Name: user.Name,
        Email: user.Email
      })
    } catch (e: any) {
      console.error('Create user error:', e)
      return reply.code(500).send({ message: 'Internal error' })
    }
  })

  app.post('/users/login', async (req, reply) => {
    const parsed = userLoginSchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })

    const { username, password } = parsed.data

    try {
      const user = await myMemberPrisma.player.findUnique({
        where: { PlayerID: username }
      })

      if (!user) {
        return reply.code(401).send({ message: 'Invalid credentials' })
      }

      if (user.Block !== 'ALLOW') {
        return reply.code(403).send({ message: 'Account blocked' })
      }

      const hashedPassword = hashPassword(password)
      if (user.Passwd !== hashedPassword) {
        return reply.code(401).send({ message: 'Invalid credentials' })
      }

      const token = app.jwt.sign({ 
        userId: user.id_idx, 
        username: user.PlayerID 
      }, { expiresIn: '24h' })

      return { 
        token,
        user: {
          id_idx: user.id_idx,
          PlayerID: user.PlayerID,
          Name: user.Name,
          Email: user.Email
        }
      }
    } catch (e: any) {
      console.error('Login error:', e)
      return reply.code(500).send({ message: 'Internal error' })
    }
  })

  app.get('/users/me', async (req, reply) => {
    try {
      const auth = req.headers.authorization
      if (!auth) return reply.code(401).send({ message: 'No token' })
      
      const token = auth.split(' ')[1]
      const payload = app.jwt.verify<{ userId: number }>(token)

      const user = await myMemberPrisma.player.findFirst({
        where: { id_idx: payload.userId }
      })

      if (!user) return reply.code(404).send({ message: 'User not found' })

      const heroes = await myGamePrisma.u_hero.findMany({
        where: { id_idx: user.id_idx },
        orderBy: { hero_order: 'asc' }
      })

      return {
        id_idx: user.id_idx,
        PlayerID: user.PlayerID,
        Name: user.Name,
        Email: user.Email,
        Block: user.Block,
        Access: user.Access,
        RegDate: user.RegDate,
        LastLoginDate: user.LastLoginDate,
        heroes: heroes.map(h => ({
          id_idx: h.id_idx,
          hero_order: h.hero_order,
          serial: h.serial.toString(),
          name: h.name,
          hero_type: h.hero_type,
          class: h.class,
          baselevel: h.baselevel,
          exp: h.exp,
          str: h.str,
          dex: h.dex,
          aim: h.aim,
          luck: h.luck,
          gold: h.gold,
          abil_freepoint: h.abil_freepoint,
          now_zone_idx: h.now_zone_idx,
          login: h.login,
          resets: h.resets
        }))
      }
    } catch (e: any) {
      console.error('Get me error:', e)
      return reply.code(401).send({ message: 'Invalid token' })
    }
  })
}
