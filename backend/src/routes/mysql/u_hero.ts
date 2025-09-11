import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { myGamePrisma } from '../../db.js'
import { convertData } from './_data.js'

const createSchema = z.object({
  id_idx: z.number().int().min(1),
  hero_order: z.number().int().min(0),
  serial: z.number().int().min(1),
  class: z.number().int().default(80),
  name: z.string().min(3).max(12),
  hero_type: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  now_zone_idx: z.number().int().default(130),
  now_zone_x: z.number().int().default(134),
  now_zone_y: z.number().int().default(148),
  init_pos_layer: z.number().int().default(0),
  revive_zone_idx: z.number().int().default(130),
  baselevel:  z.number().int().default(222),
  gold: z.number().int().default(1000000000),
  attr: z.number().int().default(0),
  exp: z.string().default('0'),
  speed_move: z.number().int().default(255),
  speed_attack: z.number().int().default(0),
  speed_skill: z.number().int().default(0),
  str: z.number().int().min(10).default(10),
  dex: z.number().int().min(10).default(10),
  aim: z.number().int().min(10).default(10),
  luck: z.number().int().min(10).default(10),
  ap: z.number().int().default(3),
  dp: z.number().int().default(3),
  hc: z.number().int().default(1),
  hd: z.number().int().default(4),
  hp: z.number().int().default(30000),
  mp: z.number().int().default(15000),
  maxhp: z.number().int().default(0),
  maxmp: z.number().int().default(0),
  abil_freepoint: z.number().int().default(1000),
  res_fire: z.number().int().default(0),
  res_water: z.number().int().default(0),
  res_earth: z.number().int().default(0),
  res_wind: z.number().int().default(0),
  res_devil: z.number().int().default(0),
  ign_att_cnt: z.number().int().default(0),
  regdate: z.preprocess((v) => v ?? new Date(), z.date()),
  avatar_head: z.number().int().default(8569),
  avatar_body: z.number().int().default(0),
  avatar_foot: z.number().int().default(0),
  return_time: z.number().int().default(0),
  status: z.number().int().default(0),
  nickname: z.number().int().default(0),
  skill_point: z.number().int().default(1000),
  login: z.boolean().default(false),
  limit_zone_idx: z.number().int().default(0),
  requestname: z.number().int().default(1),
  PlayedTime: z.number().int().default(0),
  resets: z.number().int().default(24)
})

export async function u_heroRoutes(app: FastifyInstance) {
  app.addHook('preSerialization', (_req, _reply, payload, done) => {
    done(null, convertData(payload))
  })

  app.post('/mysql/u_hero', async (req, reply) => {
    const parsed = createSchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    try {
      const u_hero = await myGamePrisma.u_hero.create({ data: parsed.data })
      return reply.code(201).send(u_hero)
    } catch (e: any) {
      if (e.code === 'P2002') return reply.code(409).send({ message: 'db error' })
      return reply.code(500).send({ message: 'internal error' })
    }
  })

  app.get('/mysql/u_hero', async () => {
    return myGamePrisma.u_hero.findMany()
  })
}