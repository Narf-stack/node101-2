const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
// require dotenv usqge
require('dotenv').config()
// MIDDLEWARES
// parse json
app.use(express.json())
app.use(express.static('./public'))
// routes
app.use('/api/v1/tasks', tasks)

app.post('/hello',(req,res)=>{
  res.status(200).json(req.body)
})


// app.get('/api/v1/tasks',(req,res)=>{
//   res.status(200).send('all tasks ')
// })

// app.post('/api/v1/tasks',(req,res)=>{
//   res.status(200).send('create task ')
// })

// app.get('/api/v1/tasks/:id',(req,res)=>{
//   res.status(200).send('get single task ')
// })

// app.patch('/api/v1/tasks/:id',(req,res)=>{
//   res.status(200).send('update single task ')
// })

// app.delete('/api/v1/tasks/:id',(req,res)=>{
//   res.status(200).send('delete single task ')
// })

// server
const port = 3000

const start = async( )=>{
  try {
    await connectDB(process.env.MONGO_URI)
    console.log('DB connection established')
    app.listen(port, () =>{
      console.log('server listenning')
    })
  }
  catch(error){
    console.log(error)
  }
}

start()