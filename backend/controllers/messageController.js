const asyncHandler = require('express-async-handler')
const Chat = require('../models/chat')
const Message = require('../models/message')
const User = require('../models/user')

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body

  if (!chatId || !content) {
    console.log('Invalid data passed into request')
    return res.sendStatus(400)
  }

  const newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
  }

  try {
    var message = await Message.create(newMessage)
    message = await message.populate('sender', 'name profileAvatar')
    message = await message.populate('chat')
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name profileAvatar email',
    })

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    })

    res.json(message)
  } catch (err) {
    res.status(400)
    throw new Error(error.message)
  }
})

module.exports = { sendMessage }
