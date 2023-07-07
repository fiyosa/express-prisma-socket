import prisma from '../../config/db'
import { __ } from '../../utils'
import { decodeId } from '../../utils/hash'

export const remove = async (chat_id: string): Promise<boolean> => {
  try {
    await prisma.chats.delete({
      where: {
        id: Number(decodeId(chat_id)),
      },
    })

    return true
  } catch (err) {
    return false
  }
}
