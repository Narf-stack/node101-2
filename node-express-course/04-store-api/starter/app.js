// invoc .env file
require('dotenv').config()
// package for try catch 
require('express-async-errors')

//ASYNC ERRORS

// APP
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
// MIDDLEWARES
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json()) // parse json

// routes
 app.get('/', (req,res)=>{
  res.status(200).send('<h1>Store API</h1><a href="/app/v1/products">products route </a>')
 })

app.use('/api/v1/products',productsRouter)
// products route


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
  try {
    // promise to connect to DB before listenning 
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>{
      console.log( `server listenning ${port}`)
    })
  } catch (error) {
    errorHandlerMiddleware(error)
  }
}


start()