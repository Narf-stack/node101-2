const express = require('express')
const path = require('path')
const app = express()

// set up static and middleware
app.use(express.static('./public'))

// app.get('/', (req,res) =>{
//   res.sendFile(path.resolve(__dirname,'./navbar-app/index.html'))
// render in static file
// })

app.all('*',(req,res)=>{
  res.status(404).send('not found')
})
app.listen(5000,()=> {
  console.log('server listening')
})