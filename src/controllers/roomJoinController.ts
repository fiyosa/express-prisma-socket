import { Request, Response } from 'express'
import { sendData, __ } from '../utils'
import { roomJoinResource } from '../resources'
import { roomJoinRepository } from '../repositories'

export const show = async (req: Request, res: Response) => {
  const room_id = (req.query?.room_chat_id as string) || ''
  const room_join = await roomJoinRepository.show(room_id)

  return sendData(res, roomJoinResource.show(room_join), __('retrieved_successfully', { operator: __('room_join') }))
}
