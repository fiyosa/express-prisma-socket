import { Socket } from 'socket.io'

interface IProps {
  room_id: string
  user_id: string
}

export const joinChatSocket = (socket: Socket) => {
  socket.on('join_chat', async (props: IProps) => {
    socket.join(props.room_id)

    socket.broadcast.to(props.room_id).emit('join_chat_status', {
      status: true,
      user_id: props.user_id,
    })
  })
}
