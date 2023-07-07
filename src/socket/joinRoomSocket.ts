import { Socket } from 'socket.io'

export const joinRoomSocket = (socket: Socket) => {
  socket.on('join_room', async (props: { user_id: string }) => {
    socket.join(props.user_id)

    socket.broadcast.to(props.user_id).emit('join_room_status', {
      status: true,
    })
  })
}
