import { room_joins, users } from '@prisma/client'
import { date } from '../../utils'
import { encodeId } from '../../utils/hash'

export const show = (
  rooms: (room_joins & {
    user: users
  })[]
) => {
  return rooms.map((room) => {
    return {
      id: encodeId(Number(room.id?.toString()) || -1),
      room_id: encodeId(Number(room.room_chat_id?.toString()) || -1),
      user: {
        id: encodeId(Number(room.user.id?.toString()) || -1),
        username: room.user.username,
        email: room.user.email,
        image: room.user.image,
      },
      created_at: date.formatDate(room.created_at?.toISOString() || ''),
      updated_at: date.formatDate(room.updated_at?.toISOString() || ''),
    }
  })
}
