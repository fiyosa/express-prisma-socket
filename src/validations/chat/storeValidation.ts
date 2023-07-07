import { body } from 'express-validator'
import { ___ } from '../../utils'

export const store = [
  body('room_chat_id')
    .exists()
    .withMessage(___('required', { attribute: 'room_chat_id' }))
    .notEmpty()
    .withMessage(___('null', { attribute: 'room_chat_id' })),

  body('user_id')
    .exists()
    .withMessage(___('required', { attribute: 'user_id' }))
    .notEmpty()
    .withMessage(___('null', { attribute: 'user_id' })),

  body('message')
    .exists()
    .withMessage(___('required', { attribute: 'message' }))
    .notEmpty()
    .withMessage(___('null', { attribute: 'message' })),
]
