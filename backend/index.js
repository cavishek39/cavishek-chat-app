const express = require('express')
const { chats } = require('./dummy_data/chats')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send(chats)
})

app.get('/chats', (req, res) => {
  res.send(chats)
})

app.get('/api/chats/:id', (req, res) => {
  const oneToOneChatRoom = chats.find((chat) => chat._id === req.params.id)

  res.send(oneToOneChatRoom)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
