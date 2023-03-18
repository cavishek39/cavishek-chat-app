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

router.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'
  )
  response.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

router.route('/').post(protect, accessChat)
router.route('/').get(protect, fetchChats)
router.route('/group').post(protect, createGroupChat)
router.route('/rename').put(protect, renameGroup)
router.route('/groupRemove').put(protect, removeFromGroup)
router.route('/groupAdd').put(protect, addToGroup)

module.exports = router
