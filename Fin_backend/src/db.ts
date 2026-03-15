import { PrismaPg } from '@prisma/adapter-pg'
import {  PrismaClient } from './generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const getPrisma = (database_url: string) => {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: database_url })
  }).$extends(withAccelerate())
  return prisma
}