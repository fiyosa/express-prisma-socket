import { chats } from '@prisma/client'
import prisma from '../../config/db'
import { date, __ } from '../../utils'
import { decodeId } from '../../utils/hash'

interface IProps {
  room_id: string
  user_id: string
  message: string
}

export const store = async (props: IProps): Promise<chats | null> => {
  try {
    const room_id = Number(decodeId(props.room_id))
    const user_id = Number(decodeId(props.user_id))
    const message = props.message
    const date_now = date.moment(date.now()).add(7, 'hours').toISOString()

    const chat = await prisma.$transaction(async (prisma) => {
      try {
        const chat = await prisma.chats.create({
          data: {
            room_chat_id: room_id,
            user_id: user_id,
            message: message,
            created_at: date_now,
            updated_at: date_now,
          },
        })

        await prisma.room_chats.update({
          where: {
            id: room_id,
          },
          data: {
            user_id: user_id,
            last_message: message,
            updated_at: date_now,
          },
        })

        return chat
      } catch (err) {
        return null
      }
    })

    return chat
  } catch (err) {
    return null
  }
}
