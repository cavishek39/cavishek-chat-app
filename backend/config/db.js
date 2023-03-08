const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  console.log('MONGO_URI', process.env.MONGO_URI)
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 5000,
    })
    console.log('MONGO DB connected ', conn.connection.host)
  } catch (error) {
    console.log(`Error ${error.message}`)
    process.exit()
  }
}

module.exports = connectDB
