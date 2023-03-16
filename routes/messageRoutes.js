const express = require('express')
const { sendMessage, allMessages } = require('../controllers/messageController')
const { protect } = require('../middleware/auth')
// const
const router = express.Router()

router.route('/').post(protect, sendMessage)
router.route('/:chatId').get(protect, allMessages)

module.exports = router
