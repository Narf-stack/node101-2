const express = require('express')
const app = express()
const logger = require('./logger')
const morgan = require('morgan')
const authorize = require('./authorize')

// pass the personally designed midllewares to every route 
// Order matter ;
//  - needs to be on top, before the routes 
//  - middleware will be executed in the order in the array
// app.use([logger, authorize])

// Use express to provide middleware 
// app.use(express.static(./public))

// Use third party midleware. ( ex: morgan for the logging )
app.use(morgan('tiny'))

app.get('/', (req,res) =>{
  res.send('<h1>welcom wrld</h1>')
})

app.get('/api/products', (req,res) =>{
  
  res.send('newProds')
})


app.get('/api/products/:id', (req,res) =>{
  res.send('singleProd')
})


app.get('/about', (req,res) =>{
  
  res.status(200).send('about')
})


app.all('*',(req,res)=>{
  res.status(404).send('not found')
})


app.listen(5000,()=> {
  console.log('server listening')
})