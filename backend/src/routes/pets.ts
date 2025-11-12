import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma, myServerPrisma, myGamePrisma, myMemberPrisma } from '../db.js'


const createSchema = z.object({
  characterId: z.string(),
  henchId: z.union([z.string(), z.number()]),
  nickname: z.string().optional(),
  in_party: z.boolean().optional(),
})

const createManySchema = z.array(createSchema).min(1).max(20)

const deleteBulkSchema = z.object({
  characterId: z.string(),
  petIds: z.array(z.string()).min(1).max(20)
})

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets/bulk', async (req, reply) => {
    const parsed = createManySchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    const data = parsed.data

    const characterIds = Array.from(new Set(data.map(d => d.characterId)))
    const characters = await prisma.character.findMany({ where: { id: { in: characterIds } }, select: { id: true } })
    if (characters.length !== characterIds.length) return reply.code(404).send({ message: 'one or more characters not found' })

    const created: any[] = []

    const chars = await prisma.character.findMany({ where: { id: { in: characterIds } }, include: { user: true } })

    const genSerial = () => {
      const ts = BigInt(Date.now())
      const rand = BigInt(Math.floor(Math.random() * 1_000_000))
      return ts * 1000000n + rand
    }

    for (const item of data) {
      const char = chars.find(c => c.id === item.characterId)
      if (!char) return reply.code(404).send({ message: 'character not found' })

      let id_idx: number | null = null
      if (char.user?.username) {
        const player = await myMemberPrisma.player.findUnique({ where: { PlayerID: char.user.username }, select: { id_idx: true } }).catch(() => null)
        if (!player || player.id_idx === null || player.id_idx === undefined) return reply.code(404).send({ message: 'player id_idx not found' })
        id_idx = player.id_idx
      } else {
        return reply.code(400).send({ message: 'character has no linked user' })
      }

      const heroTableName = `u_hero`
      const heroModel = (myGamePrisma as any)[heroTableName]
      if (!heroModel || typeof heroModel.findMany !== 'function') return reply.code(500).send({ message: 'game hero table not available' })

      const hero = await heroModel.findFirst({ where: { id_idx, name: char.name } }).catch(() => null)
      if (!hero) return reply.code(404).send({ message: 'hero not found in u_hero for character' })
      const hero_order = hero.hero_order

      const lastDigit = Math.abs(Number(id_idx)) % 10
      const henchTableName = `u_hench_${lastDigit}`
      const henchModel = (myGamePrisma as any)[henchTableName]
      if (!henchModel || typeof henchModel.create !== 'function') return reply.code(500).send({ message: 'game hench table not available' })

      const raw = String(item.henchId)
      const asNum = Number(raw)
      if (!Number.isFinite(asNum)) return reply.code(400).send({ message: `henchId must be numeric s_monster.type: ${raw}` })
      const monster = await myServerPrisma.s_monster.findUnique({ where: { type: asNum } }).catch(() => null)
      if (!monster) return reply.code(404).send({ message: `s_monster type ${asNum} not found` })

      const position = item.in_party ? 0 : 1
      let hench_order = 0
      if (position === 1) {
        const existingHenches = await henchModel.findMany({ 
          where: { id_idx, hero_order, position: 1 },
          orderBy: { hench_order: 'asc' }
        }).catch(() => [])
        for (let i = 0; i < existingHenches.length; i++) {
          if (existingHenches[i].hench_order !== i) {
            await henchModel.update({
              where: { 
                id_idx_hero_order: {
                  id_idx,
                  hero_order
                },
                serial: existingHenches[i].serial 
              },
              data: { hench_order: i }
            })
          }
        }
        hench_order = existingHenches.length
      } else {
        const existing = await henchModel.count({ where: { id_idx, hero_order, position } }).catch(() => 0)
        hench_order = existing ?? 0
      }
      const serial = genSerial()
      const item_serial_0 = genSerial()
      const item_serial_1 = genSerial()
      const item_serial_2 = genSerial()
      const name = item.nickname ?? monster.name ?? `Draco`

      try {
        await henchModel.create({ data: {
          id_idx,
          hero_order,
          name,
          serial,
          position,
          hench_order,
          monster_type: asNum,
          item_serial_0,
          item_serial_1,
          item_serial_2,
        } }).catch((e: any) => { throw e })

        const petModel = {
          id: String(serial),
          created_at: new Date(),
          name: monster.name || 'Draco',
          level: 272,
          exp: 0,
          hench_order,
          characterId: item.characterId,
          henchId: String(asNum),
          in_party: item.in_party ?? false,
          hench: {
            id: String(asNum),
            name: monster.name,
            type: monster.race ?? 0,
            base_level: 272
          }
        }

        created.push(petModel)
      } catch (e: any) {
        return reply.code(500).send({ message: 'could not create game hench', details: e?.message })
      }
    }

    return reply.code(201).send(created)
  })

  app.delete('/pets/bulk', async (req, reply) => {
    const parsed = deleteBulkSchema.safeParse(req.body)
    if (!parsed.success) return reply.code(400).send({ errors: parsed.error.flatten() })
    const { characterId, petIds } = parsed.data

    const char = await prisma.character.findUnique({ where: { id: characterId }, include: { user: true } })
    if (!char) return reply.code(404).send({ message: 'character not found' })

    let id_idx: number | null = null
    if (char.user?.username) {
      const player = await myMemberPrisma.player.findUnique({ where: { PlayerID: char.user.username }, select: { id_idx: true } }).catch(() => null)
      if (!player || player.id_idx === null || player.id_idx === undefined) return reply.code(404).send({ message: 'player id_idx not found' })
      id_idx = player.id_idx
    } else {
      return reply.code(400).send({ message: 'character has no linked user' })
    }

    const lastDigit = Math.abs(Number(id_idx)) % 10
    const henchTableName = `u_hench_${lastDigit}`
    const henchModel = (myGamePrisma as any)[henchTableName]
    if (!henchModel || typeof henchModel.deleteMany !== 'function') return reply.code(500).send({ message: 'game hench table not available' })

    try {
      const deleted = await henchModel.deleteMany({ 
        where: { 
          id_idx,
          serial: { in: petIds.map(id => BigInt(id)) }
        } 
      })

      return reply.code(200).send({ 
        message: 'pets deleted successfully', 
        count: deleted.count,
        deletedIds: petIds 
      })
    } catch (e: any) {
      return reply.code(500).send({ message: 'could not delete game henches', details: e?.message })
    }
  })
}