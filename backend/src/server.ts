import Fastify from 'fastify'
import cors from '@fastify/cors'
import { prisma } from './db.js'
import { menusRoutes } from './routes/menus.js'
import { changelogRoutes } from './routes/changelogs.js'
import { characterRoutes } from './routes/characters.js'
import { guildRoutes } from './routes/guilds.js'
import { rankRoutes } from './routes/ranks.js'

const app = Fastify({ logger: true })

await app.register(cors, { origin: true })

app.get('/health', async () => ({ ok: true }))

app.get('/users', async () => {
  return prisma.user.findMany({ include: { characters: true } })
})

await app.register(menusRoutes)
await app.register(changelogRoutes)
await app.register(characterRoutes)
await app.register(guildRoutes)
await app.register(rankRoutes)

const port = Number(process.env.PORT) || 3333
app.listen({ port, host: '0.0.0.0' })
  .then(() => console.log(`API localhost:${port}`))
