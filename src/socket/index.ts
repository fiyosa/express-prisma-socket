import { Socket } from 'socket.io'
import { addChatSocket } from './addChatSocket'
import { addRoomSocket } from './addRoomSocket'
import { deleteChatSocket } from './deleteChatSocket'
import { deleteRoomSocket } from './deleteRoomSocket'
import { getChatSocket } from './getChatSocket'
import { getRoomSocket } from './getRoomSocket'
import { joinChatSocket } from './joinChatSocket'
import { joinRoomSocket } from './joinRoomSocket'

const socket_io = (socket: Socket) => {
  joinRoomSocket(socket)
  joinChatSocket(socket)

  getRoomSocket(socket)
  getChatSocket(socket)

  addChatSocket(socket)
  addRoomSocket(socket)

  deleteChatSocket(socket)
  deleteRoomSocket(socket)

  socket.on('disconnect', (data) => {
    console.log(data)
  })
}

export default socket_io
