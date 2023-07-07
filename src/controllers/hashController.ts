import { Request, Response } from 'express'
import { sendSuccess } from '../utils'
import { decodeId, encodeId } from '../utils/hash'

export const hashId = (req: Request, res: Response) => {
  const encode = (req.query?.encode as string) || ''
  const decode = (req.query?.decode as string) || ''

  if (encode.length !== 0) {
    return sendSuccess(res, {
      encode: encodeId(Number(encode)),
    })
  }

  return sendSuccess(res, {
    decode: decodeId(decode),
  })
}
