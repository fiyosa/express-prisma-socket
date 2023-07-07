import { Socket } from 'socket.io'

export const chatSocket = async (socket: Socket) => {
  socket.on('room_chat_join', async (props: { id: string }) => {
    socket.join(props.id)

    socket.broadcast.to(props.id).emit('join_status', {
      data: true,
    })
  })
}
