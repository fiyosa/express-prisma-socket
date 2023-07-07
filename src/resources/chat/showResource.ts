import { chats } from '@prisma/client'
import { date } from '../../utils'
import { encodeId } from '../../utils/hash'

export const show = (chats: chats[]) => {
  return chats.map((chat) => {
    return {
      id: encodeId(Number(chat.id?.toString()) || -1),
      user_id: encodeId(Number(chat.user_id?.toString()) || -1),
      message: chat.message,
      is_viewed: chat.is_viewed,
      revoked: chat.revoked,
      created_at: date.formatDate(chat.created_at?.toISOString() || ''),
      updated_at: date.formatDate(chat.updated_at?.toISOString() || ''),
    }
  })
}
