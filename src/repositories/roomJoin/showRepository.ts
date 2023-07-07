import { room_joins, users } from '@prisma/client'
import prisma from '../../config/db'
import { __ } from '../../utils'
import { decodeId } from '../../utils/hash'

export const show = async (
  room_id: string
): Promise<
  (room_joins & {
    user: users
  })[]
> => {
  try {
    const room_joins = await prisma.room_joins.findMany({
      where: {
        room_chat_id: Number(decodeId(room_id)),
      },
      include: {
        user: true,
      },
    })

    return room_joins
  } catch (err) {
    return []
  }
}
