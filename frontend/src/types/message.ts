import { Chat } from './chat'
import { User } from './user'

export interface Message {
  sender: User
  content: string
  chat: Chat
  timestamps: string
  _id: string
}
