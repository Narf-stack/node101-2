const express = require('express')
const app = express()
let { people } = require('./data')

// static assets
app.use(express.static('./methods-public'))
// parse from data 
app.use(express.urlencoded({extended:false }))
// parse json
app.use(express.json())

app.get('/api/people', (req,res) =>{
  res.status(200).json({success: true, data: people})
})

app.post('/login', (req,res) =>{
  const { name } = req.body
  if(name){
    return res.status(200).send(`welcome ${name}`)
  } else {
    return res.status(401).send(`please provide credential`)
  }
  
})

app.post('/api/people', (req,res) =>{
  const { name } = req.body
  if(name){
    return res.status(201).json({success: true, person: name})
  } else {
    return res.status(401).json({success: false, msg:'please provide credential'} )
  }
})

app.all('*',(req,res)=>{
  res.status(404).send('not found')
})


app.listen(5000,()=> {
  console.log('server listening')
})