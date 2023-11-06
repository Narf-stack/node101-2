const express = require('express')
const app = express()
const tasks = require('./routes/tasks')

// MIDDLEWARES
// parse json
app.use(express.json())

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
app.listen(port, () =>{
  console.log('server listenning')
  
})