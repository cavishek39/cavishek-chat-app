const express = require('express')
const dotenv = require('dotenv')
const { chats } = require('./dummy_data/chats')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const path = require('path')

const { errorHandler, notFound } = require('./middleware/errorHandling')
dotenv.config()
connectDB()
const app = express()
app.use(express.json())
const helmet = require('helmet')
app.use(helmet())

const PORT = process.env.PORT || 5000

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

// -----------------------DEPLOYMENT-----------------------------------------
const __dirname1 = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '/frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('Api running successfully')
  })
}

app.use(notFound)
app.use(errorHandler)

const server = app.listen(PORT, '127.0.0.1', () =>
  console.log(`Server is running on port ${PORT}`)
)

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://127.0.0.1:3000/',
    // credentials: true,
  },
})

io.on('connection', (socket) => {
  console.log('connected to socket.io')
  socket.on('setup', (userData) => {
    socket.join(userData._id)
    socket.emit('connected')
  })

  socket.on('join chat', (room) => {
    socket.join(room)
    console.log('user joined the room ', room)
  })

  socket.on('new message', (newMessageReceived) => {
    const chat = newMessageReceived.chat

    if (!chats.users) return console.log('No user there inside the chat')
    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return

      socket.in(user._id).emit('message received', newMessageReceived)
    })
  })

  socket.on('typing', (room) => socket.in(room).emit('typing'))

  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))

  socket.off('setup', () => {
    console.log('USER DISCONNECTED')
    socket.leave(userData._id)
  })
})
