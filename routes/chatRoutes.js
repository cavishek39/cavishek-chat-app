const express = require('express')
const {
  accessChat,
  fetchChats,
  addToGroup,
  createGroupChat,
  removeFromGroup,
  renameGroup,
} = require('../controllers/chatControllers')
const { protect } = require('../middleware/auth')

const router = express.Router()

router.route('/').post(protect, accessChat)
router.route('/').get(protect, fetchChats)
router.route('/group').post(protect, createGroupChat)
router.route('/rename').put(protect, renameGroup)
router.route('/groupRemove').put(protect, removeFromGroup)
router.route('/groupAdd').put(protect, addToGroup)

module.exports = router
