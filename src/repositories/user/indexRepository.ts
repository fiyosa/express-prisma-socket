import { room_chats, users } from '@prisma/client'
import { Request } from 'express'
import prisma from '../../config/db'

export const index = async (
  req: Request
): Promise<
  (users & {
    room_chats: room_chats[]
  })[]
> => {
  try {
    const page = req.query?.page || '1'
    const limit = req.query?.limit || '10'
    const keyword = req.query?.keyword || ''

    const users = await prisma.users.findMany({
      skip: parseInt(page as string) < 1 ? 0 : (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
      where: {
        OR: [
          {
            email: {
              contains: '%' + keyword + '%',
            },
          },
          {
            name: {
              contains: '%' + keyword + '%',
            },
          },
        ],
      },
      include: {
        room_chats: true,
      },
    })

    return users
  } catch (err) {
    return []
  }
}
