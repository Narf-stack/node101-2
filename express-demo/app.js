const express  = require('express')
const app = express()


const courses = [
  {id: 1, name: 'courses1' },
  {id: 2, name: 'courses2' },
  {id: 3, name: 'courses3' },
]
// define routes
app.get('/',(req,res) => {
  res.send('hello world')
})

app.get('/api/courses',(req,res) => {
  res.send(courses)
})

app.get('/api/courses/:id',(req,res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if(!course) res.status(404).send(`course ${req.params.id} not found`)
  res.send(course)
  // res.send(`course ${req.params.id}`)
  // res.send(`query param ${req.query}`)
})

// Assign port value 
const port = process.env.PORT || 3000

// listening to app
app.listen(port, ()=> {
  console.log(`Listen on port ${port}`)
})