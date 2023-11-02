
const Joi = require('joi') // validation input for put request
const express  = require('express')
const app = express()

// enabled parsing of the body request
app.use(express.json())

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

app.post('/api/courses',(req,res) => {
  
  // validation input params
  const {error} = validateCourse(req.body) // result.error
  if (error){
    res.status(400).send(error.details[0].message)
    return
  }


  const course = {
    id: courses.length + 1 , 
    name: req.body.name
  }
 courses.push(course)
 res.send(course)
})


app.put('/api/courses/:id',(req,res) => {

  const course = courses.find(c => c.id === parseInt(req.params.id))
  if(!course) res.status(404).send(`course ${req.params.id} not found`)
  
  //const result = validateCourse(req.body)
  const {error} = validateCourse(req.body) // result.error

  if (error){
    res.status(400).send(error.details[0].message)
    return
  }

  course.name = req.body.name
  res.send(course)

})


function validateCourse(course){
    // validation input params
    const schema = {
      name: Joi.string().min(3).required()
    }
  
    return Joi.ValidationError(course, schema)
}
// Assign port value 
const port = process.env.PORT || 3000

// listening to app
app.listen(port, ()=> {
  console.log(`Listen on port ${port}`)
})