import { Socket } from 'socket.io'
import prisma from '../config/db'
import { chatRepository, roomJoinRepository } from '../repositories'
import { roomJoinResource } from '../resources'
import { date } from '../utils'
import { decodeId } from '../utils/hash'

interface IProps {
  chat_id: string
  room_id: string
}

export const deleteChatSocket = (socket: Socket) => {
  socket.on('delete_message', async (props: IProps) => {
    try {
      const chat_last = await prisma.chats.findMany({
        where: {
          room_chat_id: Number(decodeId(props.room_id)),
        },
        orderBy: {
          id: 'desc',
        },
        take: 2,
      })

      if (chat_last.length === 0) return

      const room_joins = roomJoinResource.show(await roomJoinRepository.show(props.room_id))

      if (Number(chat_last[0].id?.toString()) === Number(decodeId(props.chat_id))) {
        const date_now = date.moment(date.now()).add(7, 'hours').toISOString()

        await prisma.room_chats.update({
          where: {
            id: Number(decodeId(props.room_id)),
          },
          data: {
            last_message: chat_last[1]?.message || '',
            user_id: chat_last[1]?.user_id || null,
            updated_at: date_now,
          },
        })

        for (const room_join of room_joins) {
          socket.broadcast.to(room_join.user.id).emit('join_room_status', {
            status: true,
          })
        }
      }

      const result = await chatRepository.remove(props.chat_id)

      if (!result) return

      for (const room_join of room_joins) {
        socket.broadcast.to(room_join.room_id).emit('join_chat_status', {
          status: true,
          user_id: room_join.user.id,
        })
      }
    } catch (err) {
      console.log(err?.message)
    }
  })
}
