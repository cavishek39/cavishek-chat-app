const mongoose = require('mongoose')
const DEFAULT_AVATAR = require('../constants/constants')

const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileAvatar: { type: String, required: true, default: DEFAULT_AVATAR },
  },
  { timestamp: true }
)

const User = mongoose.Model('User', userModel)

module.exports = User
