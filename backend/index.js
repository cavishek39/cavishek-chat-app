const express = require('express')
const dotenv = require('dotenv')
const { chats } = require('./dummy_data/chats')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')

const { errorHandler, notFound } = require('./middleware/errorHandling')
dotenv.config()
connectDB()
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send(chats)
})

app.get('/api/chats', (req, res) => {
  res.send(chats)
})

app.get('/api/chats/:id', (req, res) => {
  const oneToOneChatRoom = chats.find((chat) => chat._id === req.params.id)

  res.send(oneToOneChatRoom)
})

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
