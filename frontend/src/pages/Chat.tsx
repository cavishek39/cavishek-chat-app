import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Chat = () => {
  const [chatsData, setChatsData] = useState([])

  async function getChats() {
    const { data } = await axios.get('/api/chats')

    setChatsData(data)
  }

  useEffect(() => {
    getChats()
  }, [])

  return (
    <div>
      {chatsData.map((cd) => (
        <div>{cd.chatName}</div>
      ))}
    </div>
  )
}
