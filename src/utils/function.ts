import env from '../config/env'
import { ILang, lang } from '../lang'
import { ILangValidation, langValidation } from '../lang/validation'

export const __ = (msg: keyof ILang, args?: any) => {
  let newMsg: string = lang[env.LOCALE as keyof typeof lang][msg]

  if (isObject(args)) {
    Object.keys(args).map((arg: string) => {
      newMsg = newMsg.replace(':' + arg, args[arg])
    })
    return newMsg
  }

  return newMsg
}

export const ___ = (msg: keyof ILangValidation, args?: any) => {
  let newMsg: string = langValidation[env.LOCALE as keyof typeof langValidation][msg]

  if (isObject(args)) {
    Object.keys(args).map((arg: string) => {
      newMsg = newMsg.replace(':' + arg, args[arg])
    })
    return newMsg
  }

  return newMsg
}

export const isObject = (check: any) => {
  return typeof check === 'object' && !Array.isArray(check) && check !== null
}

export const isArray = (check: any) => {
  return Array.isArray(check)
}

export const BaseResource = (input: any, callback: Function) => {
  if (isObject(input)) {
    return callback(input)
  }

  if (isArray(input)) {
    const newResult = []
    for (const value of input) {
      newResult.push(callback(value))
    }
    return newResult
  }

  return null
}
