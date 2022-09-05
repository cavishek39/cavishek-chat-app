const express = require('express')
const { sendMessage } = require('../controllers/messageController')
const { protect } = require('../middleware/auth')
// const
const router = express.Router()

router.route('/').post(protect, sendMessage)
// router.route('/:chatId').post(protect, allMessages)

module.exports = router
