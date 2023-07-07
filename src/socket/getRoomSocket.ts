import { Socket } from 'socket.io'
import { roomChatRepository } from '../repositories'
import { roomChatResource } from '../resources'

export const getRoomSocket = (socket: Socket) => {
  socket.on('get_room', async (data) => {
    try {
      const rooms = await roomChatRepository.show(data?.id || '')

      socket.broadcast.to(data?.id).emit('room_received', {
        data: roomChatResource.show(rooms),
      })
    } catch (err) {
      socket.broadcast.to(data?.id).emit('room_received', {
        data: [],
      })
    }
  })
}
