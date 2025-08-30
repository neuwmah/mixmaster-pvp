import Fastify from 'fastify'
import cors from '@fastify/cors'
import { menusRoutes } from './routes/menus.js'
import { changelogRoutes } from './routes/changelogs.js'
import { characterRoutes } from './routes/characters.js'
import { guildRoutes } from './routes/guilds.js'
import { rankRoutes } from './routes/ranks.js'
import { userRoutes } from './routes/users.js'
import { authRoutes } from './routes/auth.js'

const app = Fastify({ logger: false })

await app.register(cors, { origin: true })

app.get('/health', async () => ({ ok: true }))

await app.register(menusRoutes)
await app.register(changelogRoutes)
await app.register(characterRoutes)
await app.register(guildRoutes)
await app.register(rankRoutes)
await app.register(userRoutes)
await app.register(authRoutes)

const port = Number(process.env.PORT) || 3333
app.listen({ port, host: '0.0.0.0' })
  .then(() => {
    console.clear()
    console.log(`    ▲ API localhost:${port}`)
  })
