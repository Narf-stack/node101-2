const express  = require('express')
const app = express()


// define routes
app.get('/',(req,res) => {
  res.send('hello world')
})

app.get('/api/courses',(req,res) => {
  res.send([1,2,3])
})

app.get('/api/courses/:id',(req,res) => {
  
  //res.send(`course ${req.params.id}`)
  res.send(`query param ${req.query}`)
})

// Assign port value 
const port = process.env.PORT || 3000

// listening to app
app.listen(port, ()=> {
  console.log(`Listen on port ${port}`)
})