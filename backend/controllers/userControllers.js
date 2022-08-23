const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const generateToken = require('../config/generateToken')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, profileAvatar } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please Enter all the details')
  }

  const isUserExists = await User.findOne({ email })

  if (isUserExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileAvatar: user.profileAvatar,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Something went wrong while creating user')
  }
})

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.verifyPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileAvatar: user.profileAvatar,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid login credentials')
  }
})

module.exports = { registerUser, authUser }
