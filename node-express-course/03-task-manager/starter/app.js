const express = require('express')
const app = express()

// routes
app.get('/hello',(req,res)=>{
  res.status(200).send('task manager app')
})


const port = 3000

app.listen(port, () =>{
  console.log('server listenning')
  
})