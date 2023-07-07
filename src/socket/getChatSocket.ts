import { Socket } from 'socket.io'
import { chatRepository } from '../repositories'
import { chatResource } from '../resources'

interface IProps {
  room_id: string
  user_id: string
}

export const getChatSocket = (socket: Socket) => {
  socket.on('get_message', async (props: IProps) => {
    const chats = await chatRepository.show(props.room_id)
    socket.broadcast
      .to(props.room_id)
      .emit('message_received', { data: chatResource.show(chats), user_id: props.user_id })
  })
}
