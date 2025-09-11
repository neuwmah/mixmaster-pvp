import { PrismaClient as PgPrismaClient } from '../prisma/generated/postgresql/index.js'
import { PrismaClient as MyPrismaClient } from '../prisma/generated/mysql/index.js'

declare global {
  // eslint-disable-next-line no-var
  var pgPrisma: PgPrismaClient | undefined
  // eslint-disable-next-line no-var
  var myPrisma: MyPrismaClient | undefined
}

export const pgPrisma = global.pgPrisma || new PgPrismaClient()
export const myPrisma = global.myPrisma || new MyPrismaClient()
export const prisma = pgPrisma

if (process.env.NODE_ENV !== 'production') {
  global.pgPrisma = pgPrisma
  global.myPrisma = myPrisma
}