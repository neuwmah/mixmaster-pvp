import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma, myMemberPrisma, myGamePrisma } from '../db.js'
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

      try {
        const player = await myMemberPrisma.player.findUnique({ where: { PlayerID: user.username }, select: { id_idx: true } })
        if (!player || player.id_idx === null || player.id_idx === undefined) {
          return { ...user, password: undefined }
        }

        const lastDigit = Math.abs(Number(player.id_idx)) % 10
        const henchTableName = `u_hench_${lastDigit}`

        const henchModel = (myGamePrisma as any)[henchTableName]
        let henchRows: any[] = []
        if (henchModel && typeof henchModel.findMany === 'function') {
          henchRows = await henchModel.findMany({ where: { id_idx: player.id_idx } })
        }

        const pets: any[] = []
        for (const h of henchRows) {
          const pet: any = {
            id: String(h.serial ?? `${h.id_idx}-${h.hero_order}`),
            created_at: h.last_check_time ?? new Date(),
            nickname: h.name || null,
            level: h.baselevel ?? 1,
            exp: Number(h.exp ?? 0),
            characterId: String(h.hero_order ?? 0),
            henchId: String(h.monster_type ?? 1),
            in_party: h.position == 0 ? true : false,
            order: h.hero_order
          }
          try {
            const mtype = Number(h.monster_type ?? 0)
            const monster = await (myServerPrisma as any).s_monster.findUnique({ where: { type: mtype } }).catch(() => null)
            if (monster) pet.hench = monster
          } catch {}
          pets.push(pet)
        }

        const chars = Array.isArray(user.characters) ? user.characters : []
        const charactersWithPets = chars.map((c: any, index: number) => {
          const cPets = pets.filter(p => Number(p.order) === index)
          return { ...c, pets: cPets }
        })

        return { ...user, password: undefined, characters: charactersWithPets, pets }
      } catch (e) {
        console.error('auth/me pets fetch error', (e as any)?.message)
        return { ...user, password: undefined }
      }
    } catch (e) {
      console.error('auth/me error', (e as any)?.message)
      return reply.code(401).send({ message: 'invalid token' })
    }
  })
}
