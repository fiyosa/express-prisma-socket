import { room_chats, room_joins, users } from '@prisma/client'
import prisma from '../../config/db'
import { __ } from '../../utils'
import { decodeId } from '../../utils/hash'

export const show = async (
  user_id: string
): Promise<
  (room_chats & {
    room_joins: (room_joins & {
      user: users
    })[]
  })[]
> => {
  try {
    const rooms = await prisma.room_joins.findMany({
      select: {
        room_chat_id: true,
      },
      where: {
        user_id: Number(decodeId(user_id)),
      },
    })

    const room_chat_id = rooms.map((room) => room.room_chat_id)

    const room_chats = await prisma.room_chats.findMany({
      where: {
        id: {
          in: room_chat_id,
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
      include: {
        room_joins: {
          where: {
            NOT: {
              user_id: Number(decodeId(user_id)),
            },
          },
          include: {
            user: true,
          },
        },
      },
    })

    return room_chats
  } catch (err) {
    return []
  }
}
