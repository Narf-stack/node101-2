require('dotenv').config()

const connectDB = require('./db/connect.js')
const Product = require('./models/product')
const jsonProducts = require('./products.json')


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany() // Remove all old products
    await Product.create(jsonProducts) // Populate with new products
    console.log('sucess')
    process.exit(0) // Exit process once succesfull
  } catch (error) {
    console.log(error)
    process.exit(1) // Retry process while unsuccesfull
  }
}

start()