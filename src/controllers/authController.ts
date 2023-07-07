import { NextFunction, Request, Response } from 'express'
import { sendError, sendValidation, __ } from '../utils'

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return sendError(res, 400, __('credentials_failed'))
  next()
}

export const validation = (req: Request, res: Response, next: NextFunction) => {
  if (!sendValidation(req, res)) return
  console.log('hah?')

  next()
}
