const express = require('express')
const { sendMessage, allMessages } = require('../controllers/messageController')
const { protect } = require('../middleware/auth')
// const
const router = express.Router()

router.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'
  )
  response.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

router.route('/').post(protect, sendMessage)
router.route('/:chatId').get(protect, allMessages)

module.exports = router
