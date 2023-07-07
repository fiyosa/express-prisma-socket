import { room_chats, users } from '@prisma/client'
import { date } from '../../utils'
import { encodeId } from '../../utils/hash'

export const index = (
  users: (users & {
    room_chats: room_chats[]
  })[]
) => {
  return users.map((user) => {
    return {
      id: encodeId(Number(user.id.toString()) || -1),
      email: user.email || '',
      username: user.username || '',
      name: user.name || '',
      bio: user.bio || '',
      website: user.website || '',
      gender: user.gender || '',
      image: user.image || '',
      image_base64: user.image_base64 || '',
      room_chats:
        user.room_chats.map((room_chat: any) => {
          return {
            id: encodeId(Number(room_chat.id.toString()) || -1),
          }
        }) || [],
      created_at: date.formatDate(user.created_at?.toISOString() || ''),
      updated_at: date.formatDate(user.updated_at?.toISOString() || ''),
    }
  })
}
