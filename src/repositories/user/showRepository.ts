import { users } from '@prisma/client'
import { Request } from 'express'
import prisma from '../../config/db'
import { __ } from '../../utils'
import { decodeId } from '../../utils/hash'

export const show = async (req: Request): Promise<users | null> => {
  try {
    const user = await prisma.users.findFirst({
      where: { id: Number(decodeId(req.params.id)) },
    })

    if (!user) return null

    return user
  } catch (err) {
    return null
  }
}
