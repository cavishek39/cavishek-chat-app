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

// serving the frontend
app.use(express.static(path.join(__dirname, './frontend/build')))

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'), (err) => {
    res.status(500).send(err)
  })
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

const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
)

/* const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://127.0.0.1:5001',
    // credentials: true,
  },
})

io.on('connection', (socket) => {
  console.log('Connected to socket.io')
  socket.on('setup', (userData) => {
    socket.join(userData._id)
    socket.emit('connected')
  })

  socket.on('join chat', (room) => {
    socket.join(room)
    console.log('User Joined Room: ' + room)
  })
  socket.on('typing', (room) => socket.in(room).emit('typing'))
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))

  socket.on('new message', (newMessageRecieved) => {
    var chat = newMessageRecieved.chat

    if (!chat.users) return console.log('chat.users not defined')

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return

      socket.in(user._id).emit('message recieved', newMessageRecieved)
    })
  })

  socket.off('setup', () => {
    console.log('USER DISCONNECTED')
    socket.leave(userData._id)
  })
}) */
