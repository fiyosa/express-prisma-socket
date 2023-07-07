import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  // log: ['query'], //show raw query string
})

export default prisma
