import { chats } from '@prisma/client'
import prisma from '../../config/db'
import { __ } from '../../utils'
import { decodeId } from '../../utils/hash'

export const show = async (room_chat_id: string): Promise<chats[]> => {
  try {
    const chats = await prisma.chats.findMany({
      where: {
        room_chat_id: Number(decodeId(room_chat_id)),
      },
    })

    return chats
  } catch (err) {
    return []
  }
}
