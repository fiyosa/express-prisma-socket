import { en } from './en'
import { id } from './id'

export const lang = {
  en,
  id,
}

export interface ILang {
  user: string
  post: string
  room_chat: string
  room_join: string
  chat: string

  retrieved_successfully: string
  saved_successfully: string
  updated_successfully: string
  deleted_successfully: string

  credentials_failed: string
  save_failed: string
  delete_failed: string
  something_went_wrong: string
  not_found: string
}
