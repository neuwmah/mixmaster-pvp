import { FastifyInstance } from 'fastify'
import { myGamePrisma } from '../db.js'

export async function heroRoutes(app: FastifyInstance) {
  app.get('/heroes/ranking', async () => {
    try {
      const heroes = await myGamePrisma.u_hero.findMany({
        where: {
          class: {
            lt: 29,
            not: 80
          }
        },
        select: {
          id_idx: true,
          hero_order: true,
          serial: true,
          class: true,
          name: true,
          hero_type: true,
          baselevel: true,
          exp: true,
          resets: true,
          str: true,
          dex: true,
          aim: true,
          luck: true,
          login: true
        },
        orderBy: [
          { baselevel: 'desc' },
          { exp: 'desc' }
        ],
        take: 100
      })

      const heroesFormatted = heroes.map(hero => {
        let expValue = 0
        try {
          const expStr = hero.exp?.toString() || '0'
          expValue = parseInt(expStr)
          if (isNaN(expValue)) expValue = 0
        } catch {
          expValue = 0
        }

        return {
          id_idx: hero.id_idx,
          hero_order: hero.hero_order,
          serial: hero.serial.toString(),
          class: hero.class,
          name: hero.name,
          hero_type: hero.hero_type,
          baselevel: hero.baselevel,
          exp: expValue,
          resets: hero.resets || 0,
          str: hero.str,
          dex: hero.dex,
          aim: hero.aim,
          luck: hero.luck,
          login: hero.login
        }
      })

      return heroesFormatted
    } catch (error) {
      console.error('Erro ao buscar ranking de heróis:', error)
      return []
    }
  })
}
