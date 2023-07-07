import { Request, Response } from 'express'
import { sendData, sendError, sendSuccess, __ } from '../utils'
import { chatResource } from '../resources'
import { chatRepository } from '../repositories'

export const show = async (req: Request, res: Response) => {
  const room_chat_id: string = (req.query?.room_chat_id as string) || ''

  const chats = await chatRepository.show(room_chat_id)

  return sendData(res, chatResource.show(chats), __('retrieved_successfully', { operator: __('room_chat') }))
}

export const store = async (req: Request, res: Response) => {
  const result = await chatRepository.store({
    room_id: req.body?.room_chat_id || '',
    user_id: req.body?.user_id || '',
    message: req.body?.message || '',
  })

  if (!result) return sendError(res, 400, __('save_failed', { operator: __('chat') }))

  return sendSuccess(res, __('saved_successfully', { operator: __('chat') }))
}

export const remove = async (req: Request, res: Response) => {
  const result = await chatRepository.remove(req.params?.id || '')

  if (!result) return sendError(res, 400, __('delete_failed', { operator: __('chat') }))

  return sendSuccess(res, __('deleted_successfully', { operator: __('chat') }))
}
