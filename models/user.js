const mongoose = require('mongoose')
// const { DEFAULT_AVATAR } = require('../constants/constants')
const bcrypt = require('bcryptjs')

const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileAvatar: {
      type: String,
      // default: DEFAULT_AVATAR,
    },
  },
  { timestamps: true }
)

userModel.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userModel.pre('save', async function (next) {
  if (!this.isModified) {
    next()
  } else {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
})

const User = mongoose.model('User', userModel)

module.exports = User
