import { chats } from '@prisma/client'
import { Socket } from 'socket.io'
import { chatRepository } from '../repositories'
import { chatResource } from '../resources'

export const addChatSocket = (socket: Socket) => {
  socket.on('add_message', async (props: { room_id: string; user_id: string; message: string }) => {
    const chat = await chatRepository.store({
      room_id: props.room_id,
      user_id: props.user_id,
      message: props.message,
    })

    if (!chat) return

    socket.broadcast.emit('update_room', { room_id: props.room_id })
    socket.broadcast.to(props.room_id).emit('add_message_received', { data: chatResource.show([chat as chats])[0] })
  })
}
