import { FastifyInstance } from 'fastify'
import { myServerPrisma } from '../db.js'

interface MixFormula {
  main_name: string
  main_item: number
  main_race: number
  main_level: number
  main_dropable: number
  sub_name: string
  sub_item: number
  sub_race: number
  sub_level: number
  sub_dropable: number
}

interface MixResult {
  result: number
  name: string
  level_base: number
  race: number
  race_name: string
  formulas: MixFormula[]
  used_in: string[]
}

export async function mixRoutes(app: FastifyInstance) {
  app.get('/mix/formulas', async () => {
    try {
      const mixes = await myServerPrisma.$queryRaw<any[]>`
        SELECT 
          m.mode,
          m.mainnum,
          m.maingrade,
          m1.name as main,
          m.mainnum as main_item,
          m1.race as main_race,
          m1.start_base_level as main_level,
          m1.mix_restrict as main_dropable,
          CASE m1.race 
            WHEN 0 THEN 'Dragon'
            WHEN 1 THEN 'Devil'
            WHEN 2 THEN 'Beast'
            WHEN 3 THEN 'Bird'
            WHEN 4 THEN 'Insect'
            WHEN 5 THEN 'Plant'
            WHEN 6 THEN 'Mystery'
            WHEN 7 THEN 'Metal'
            ELSE 'Unknown'
          END as main_race_name,
          m.subnum,
          m.subgrade,
          m2.name as sub,
          m.subnum as sub_item,
          m2.race as sub_race,
          m2.start_base_level as sub_level,
          m2.mix_restrict as sub_dropable,
          CASE m2.race 
            WHEN 0 THEN 'Dragon'
            WHEN 1 THEN 'Devil'
            WHEN 2 THEN 'Beast'
            WHEN 3 THEN 'Bird'
            WHEN 4 THEN 'Insect'
            WHEN 5 THEN 'Plant'
            WHEN 6 THEN 'Mystery'
            WHEN 7 THEN 'Metal'
            ELSE 'Unknown'
          END as sub_race_name,
          m.result,
          m3.name as name,
          m3.race as name_race,
          m3.mix_restrict as name_dropable,
          m3.start_base_level as name_level,
          CASE m3.race 
            WHEN 0 THEN 'Dragon'
            WHEN 1 THEN 'Devil'
            WHEN 2 THEN 'Beast'
            WHEN 3 THEN 'Bird'
            WHEN 4 THEN 'Insect'
            WHEN 5 THEN 'Plant'
            WHEN 6 THEN 'Mystery'
            WHEN 7 THEN 'Metal'
            ELSE 'Unknown'
          END as name_race_name
        FROM s_mix m
        LEFT JOIN s_monster m1 ON m.mainnum = m1.type
        LEFT JOIN s_monster m2 ON m.subnum = m2.type
        LEFT JOIN s_monster m3 ON m.result = m3.type
        WHERE m1.name IS NOT NULL 
          AND m2.name IS NOT NULL 
          AND m3.name IS NOT NULL
          AND m3.affichage = 'OUI'
        ORDER BY m3.start_base_level, m.result, m.mainnum, m.subnum
      `

      const resultGroups: { [key: number]: MixResult } = {}

      for (const mix of mixes) {
        if (!resultGroups[mix.result]) {
          resultGroups[mix.result] = {
            result: mix.result,
            name: mix.name,
            level_base: mix.name_level,
            race: mix.name_race,
            race_name: mix.name_race_name,
            formulas: [],
            used_in: []
          }
        }

        resultGroups[mix.result].formulas.push({
          main_name: mix.main,
          main_item: mix.main_item,
          main_race: mix.main_race,
          main_level: mix.main_level,
          main_dropable: mix.main_dropable,
          sub_name: mix.sub,
          sub_item: mix.sub_item,
          sub_race: mix.sub_race,
          sub_level: mix.sub_level,
          sub_dropable: mix.sub_dropable
        })
      }

      for (const mix of mixes) {
        const resultName = mix.name

        for (const otherMix of mixes) {
          if (
            (otherMix.main === resultName || otherMix.sub === resultName) &&
            resultGroups[mix.result]
          ) {
            if (!resultGroups[mix.result].used_in.includes(otherMix.name)) {
              resultGroups[mix.result].used_in.push(otherMix.name)
            }
          }
        }
      }

      const result = Object.values(resultGroups).sort((a, b) => a.level_base - b.level_base)

      return result
    } catch (error) {
      console.error('Error fetching formulas:', error)
      return []
    }
  })

  app.get('/mix/formulas/:type', async (request, reply) => {
    const { type } = request.params as { type: string }
    const henchType = parseInt(type)

    if (isNaN(henchType)) {
      return reply.code(400).send({ error: 'Invalid type' })
    }

    try {
      const formulas = await myServerPrisma.$queryRaw<any[]>`
        SELECT 
          m.mode,
          m.mainnum,
          m.maingrade,
          m1.name as main_name,
          m.mainnum as main_item,
          m1.race as main_race,
          m1.start_base_level as main_level,
          m1.mix_restrict as main_dropable,
          m.subnum,
          m.subgrade,
          m2.name as sub_name,
          m.subnum as sub_item,
          m2.race as sub_race,
          m2.start_base_level as sub_level,
          m2.mix_restrict as sub_dropable
        FROM s_mix m
        LEFT JOIN s_monster m1 ON m.mainnum = m1.type
        LEFT JOIN s_monster m2 ON m.subnum = m2.type
        WHERE m.result = ${henchType}
          AND m1.name IS NOT NULL 
          AND m2.name IS NOT NULL
        ORDER BY m.mainnum, m.subnum
      `

      return formulas
    } catch (error) {
      console.error('Error fetching hench formulas:', error)
      return reply.code(500).send([])
    }
  })

  app.get('/mix/habitat/:type', async (request, reply) => {
    const { type } = request.params as { type: string }
    const henchType = parseInt(type)

    if (isNaN(henchType)) {
      return reply.code(400).send({ error: 'Invalid type' })
    }

    try {
      const habitats = await myServerPrisma.$queryRaw<any[]>`
        SELECT DISTINCT
          z0.idx as zone_idx,
          z0.name as zone_name,
          z0.min_level,
          z0.max_level,
          z0.min_mob,
          z0.max_mob,
          z0.PkZoneFlag as pk_zone,
          z0.zone_type,
          GROUP_CONCAT(DISTINCT 
            CASE 
              WHEN mi.item_idx0 > 0 THEN CONCAT(i0.name)
            END
          ) as drops0,
          GROUP_CONCAT(DISTINCT 
            CASE 
              WHEN mi.item_idx1 > 0 THEN CONCAT(i1.name)
            END
          ) as drops1,
          GROUP_CONCAT(DISTINCT 
            CASE 
              WHEN mi.item_idx2 > 0 THEN CONCAT(i2.name)
            END
          ) as drops2,
          GROUP_CONCAT(DISTINCT 
            CASE 
              WHEN mi.item_idx3 > 0 THEN CONCAT(i3.name)
            END
          ) as drops3,
          GROUP_CONCAT(DISTINCT 
            CASE 
              WHEN mi.item_idx4 > 0 THEN CONCAT(i4.name)
            END
          ) as drops4
        FROM s_mob m
        LEFT JOIN s_zone z0 ON m.zone_idx0 = z0.idx
        LEFT JOIN s_mobitem mi ON m.mobitem_idx = mi.idx
        LEFT JOIN s_item i0 ON mi.item_idx0 = i0.idx
        LEFT JOIN s_item i1 ON mi.item_idx1 = i1.idx
        LEFT JOIN s_item i2 ON mi.item_idx2 = i2.idx
        LEFT JOIN s_item i3 ON mi.item_idx3 = i3.idx
        LEFT JOIN s_item i4 ON mi.item_idx4 = i4.idx
        WHERE m.monster_type = ${henchType} AND z0.name IS NOT NULL
        GROUP BY z0.idx, z0.name, z0.min_level, z0.max_level, z0.min_mob, z0.max_mob, z0.PkZoneFlag, z0.zone_type
        UNION
        SELECT DISTINCT
          z1.idx as zone_idx,
          z1.name as zone_name,
          z1.min_level,
          z1.max_level,
          z1.min_mob,
          z1.max_mob,
          z1.PkZoneFlag as pk_zone,
          z1.zone_type,
          GROUP_CONCAT(DISTINCT 
            CASE 
              WHEN mi.item_idx0 > 0 THEN CONCAT(i0.name)
            END
          ) as drops0,
          GROUP_CONCAT(DISTINCT 
            CASE 
              WHEN mi.item_idx1 > 0 THEN CONCAT(i1.name)
            END
          ) as drops1,
          GROUP_CONCAT(DISTINCT 
            CASE 
              WHEN mi.item_idx2 > 0 THEN CONCAT(i2.name)
            END
          ) as drops2,
          GROUP_CONCAT(DISTINCT 
            CASE 
              WHEN mi.item_idx3 > 0 THEN CONCAT(i3.name)
            END
          ) as drops3,
          GROUP_CONCAT(DISTINCT 
            CASE 
              WHEN mi.item_idx4 > 0 THEN CONCAT(i4.name)
            END
          ) as drops4
        FROM s_mob m
        LEFT JOIN s_zone z1 ON m.zone_idx1 = z1.idx
        LEFT JOIN s_mobitem mi ON m.mobitem_idx = mi.idx
        LEFT JOIN s_item i0 ON mi.item_idx0 = i0.idx
        LEFT JOIN s_item i1 ON mi.item_idx1 = i1.idx
        LEFT JOIN s_item i2 ON mi.item_idx2 = i2.idx
        LEFT JOIN s_item i3 ON mi.item_idx3 = i3.idx
        LEFT JOIN s_item i4 ON mi.item_idx4 = i4.idx
        WHERE m.monster_type = ${henchType} AND z1.name IS NOT NULL
        GROUP BY z1.idx, z1.name, z1.min_level, z1.max_level, z1.min_mob, z1.max_mob, z1.PkZoneFlag, z1.zone_type
        ORDER BY zone_name
      `

      return habitats.map(h => {
        const allDrops = [h.drops0, h.drops1, h.drops2, h.drops3, h.drops4]
          .filter(Boolean)
          .join(',')
          .split(',')
          .filter((d: string) => d && d.trim())
        
        return {
          zone_idx: h.zone_idx,
          zone_name: h.zone_name,
          min_level: h.min_level,
          max_level: h.max_level,
          min_mob: h.min_mob,
          max_mob: h.max_mob,
          pk_zone: h.pk_zone,
          zone_type: h.zone_type,
          drops: allDrops
        }
      })
    } catch (error) {
      console.error('Error fetching hench habitat:', error)
      return reply.code(500).send([])
    }
  })
}
