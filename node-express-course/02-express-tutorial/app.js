const express = require('express')
const app = express()

const { products, people } = require('./data')


app.get('/', (req,res) =>{
  res.json(people)
})

app.all('*',(req,res)=>{
  res.status(404).send('not found')
})
app.listen(5000,()=> {
  console.log('server listening')
})