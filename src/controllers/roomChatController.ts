import { Request, Response } from 'express'
import { sendData, __ } from '../utils'
import { roomChatResource } from '../resources'
import { roomChatRepository } from '../repositories'

export const show = async (req: Request, res: Response) => {
  const user_id = (req.query?.user_id as string) || ''
  const rooms = await roomChatRepository.show(user_id)

  return sendData(res, roomChatResource.show(rooms), __('retrieved_successfully', { operator: __('room_chat') }))
}
