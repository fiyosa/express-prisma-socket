import Hashids from 'hashids'
import env from '../config/env'

const hashids = new Hashids(env.NODE_KEY, 10)

export const encodeId = (data: number): string => {
  try {
    return hashids.encode([data])
  } catch (err) {
    return ''
  }
}

export const decodeId = (data: string): number => {
  try {
    return hashids.decode(data)[0] as number
  } catch (err) {
    return -1
  }
}
