const express = require('express')
const {
  registerUser,
  authUser,
  allUsers,
} = require('../controllers/userControllers')
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

router.route('/').post(registerUser).get(protect, allUsers)
router.post('/login', authUser)

module.exports = router
