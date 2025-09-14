import Fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import jwt from '@fastify/jwt'
import path from 'node:path'
import fs from 'node:fs'
import { menusRoutes } from './routes/menus.js'
import { changelogRoutes } from './routes/changelogs.js'
import { characterRoutes } from './routes/characters.js'
import { guildRoutes } from './routes/guilds.js'
import { rankRoutes } from './routes/ranks.js'
import { userRoutes } from './routes/users.js'
import { authRoutes } from './routes/auth.js'
import { henchRoutes } from './routes/hench.js'
import { petRoutes } from './routes/pets.js'
import { itemsRoutes } from './routes/items.js'

const app = Fastify({ logger: false })

await app.register(cors, {
  origin: [
    'http://localhost:3000',
    'https://mixmasterpvp.com.br',
    'https://www.mixmasterpvp.com.br',
    'http://mixmasterpvp.com.br',
    'http://www.mixmasterpvp.com.br',
  ],
})

if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET env var required')
await app.register(jwt, { secret: process.env.JWT_SECRET })
await app.register(multipart, { limits: { fileSize: 5 * 1024 * 1024 } })

const uploadDir = path.join(process.cwd(), 'uploads')
fs.mkdirSync(uploadDir, { recursive: true })
await app.register(fastifyStatic, { root: uploadDir, prefix: '/uploads/' })

app.get('/health', async () => ({ ok: true }))

await app.register(menusRoutes)
await app.register(changelogRoutes)
await app.register(characterRoutes)
await app.register(guildRoutes)
await app.register(rankRoutes)
await app.register(userRoutes)
await app.register(authRoutes)
await app.register(henchRoutes)
await app.register(petRoutes)
await app.register(itemsRoutes)

const port = Number(process.env.PORT) || 3333
app.listen({ port, host: '0.0.0.0' })
  .then(() => {
    console.log(`API localhost:${port}`)
  })
