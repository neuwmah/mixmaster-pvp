import { PrismaClient as PgPrismaClient } from '../prisma/_generated/postgresql/index.js'
import { PrismaClient as MyGamePrismaClient } from '../prisma/_generated/mysql/game/index.js'
import { PrismaClient as MyMemberPrismaClient } from '../prisma/_generated/mysql/member/index.js'
import { PrismaClient as MyServerPrismaClient } from '../prisma/_generated/mysql/server/index.js'
import { PrismaClient as MyWebPrismaClient } from '../prisma/_generated/mysql/web/index.js'

declare global {
  // eslint-disable-next-line no-var
  var pgPrisma: PgPrismaClient | undefined
  // eslint-disable-next-line no-var
  var myGamePrisma: MyGamePrismaClient | undefined
  // eslint-disable-next-line no-var
  var myMemberPrisma: MyMemberPrismaClient | undefined
  // eslint-disable-next-line no-var
  var myServerPrisma: MyServerPrismaClient | undefined
  // eslint-disable-next-line no-var
  var myWebPrisma: MyWebPrismaClient | undefined
}

export const pgPrisma = global.pgPrisma || new PgPrismaClient()
export const myGamePrisma = global.myGamePrisma || new MyGamePrismaClient()
export const myMemberPrisma = global.myMemberPrisma || new MyMemberPrismaClient()
export const myServerPrisma = global.myServerPrisma || new MyServerPrismaClient()
export const myWebPrisma = global.myWebPrisma || new MyWebPrismaClient()
export const prisma = pgPrisma

if (process.env.NODE_ENV !== 'production') {
  global.pgPrisma = pgPrisma
  global.myGamePrisma = myGamePrisma
  global.myMemberPrisma = myMemberPrisma
  global.myServerPrisma = myServerPrisma
  global.myWebPrisma = myWebPrisma
}