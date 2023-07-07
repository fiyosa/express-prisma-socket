import { room_chats, room_joins, users } from '@prisma/client'
import { date } from '../../utils'
import { encodeId } from '../../utils/hash'

export const show = (
  rooms: (room_chats & {
    room_joins: (room_joins & {
      user: users
    })[]
  })[]
) => {
  return rooms.map((room) => {
    return {
      id: encodeId(Number(room.id?.toString()) || -1),
      user_id: encodeId(Number(room.user_id?.toString()) || -1),
      last_message: room.last_message,
      is_read: room.is_read,
      revoked: room.revoked,
      room_join: {
        id: encodeId(Number(room.room_joins[0].user.id?.toString()) || -1),
        name: room.room_joins[0].user.name,
        username: room.room_joins[0].user.username,
        image: room.room_joins[0].user.image,
        image_base64: room.room_joins[0].user.image_base64,
      },
      created_at: date.formatDate(room.created_at?.toISOString() || ''),
      updated_at: date.formatDate(room.updated_at?.toISOString() || ''),
    }
  })
}
