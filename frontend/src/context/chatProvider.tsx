import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Chat } from '../types/chat'
import { User } from '../types/user'

interface ChatContextArgs {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  chats: Chat[]
  setChats: React.Dispatch<React.SetStateAction<Chat[] | undefined>>
  notification: any
  setNotification: React.Dispatch<React.SetStateAction<never[]>>
  selectedChat: Chat
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat | undefined>>
}

const sampleChatContext: ChatContextArgs = {
  user: undefined,
  setUser: () => {},
  chats: [],
  setChats: () => {},
  notification: null,
  setNotification: () => {},
  selectedChat: undefined,
  setSelectedChat: () => {},
}

const ChatContext = createContext<ChatContextArgs>(sampleChatContext)

const ChatProvider = ({ children }) => {
  const history = useHistory()
  const [user, setUser] = useState<User | undefined>()
  const [notification, setNotification] = useState<any>([])
  const [chats, setChats] = useState<Chat[] | undefined>([])
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>()

  /**
   * Checks if the user is currently in the localStorage
   * then push him/her into the chat page
   */
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')!)
    setUser(userInfo)

    if (!userInfo) {
      history?.push('/')
    }
  }, [history])

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
      }}>
      {children}
    </ChatContext.Provider>
  )
}

export const ChatState = () => {
  return useContext(ChatContext)
}

export default ChatProvider
