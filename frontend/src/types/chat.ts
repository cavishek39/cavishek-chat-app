import { Message } from './message'
import { User } from './user'

export interface Chat {
  chatName: string
  isGroupChat: boolean
  users: Array<User>
  latestMessage: Message
  groupAdmin: User
  timestamps: string
  _id: string
}
