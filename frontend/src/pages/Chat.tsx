import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { ChatState } from '../context/chatProvider'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import Chatbox from '../components/Chatbox'

export const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false)
  const { user } = ChatState()

  return (
    <div style={{ width: '100%' }}>
      {!!user?._id && <SideDrawer />}
      <Box
        display='flex'
        justifyContent='space-between'
        w='100%'
        h='91.5vh'
        p='10px'>
        {!!user?._id && <MyChats fetchAgain={fetchAgain} />}
        {!!user?._id && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  )
}
