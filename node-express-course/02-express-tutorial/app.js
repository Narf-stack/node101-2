const express = require('express')
const app = express()

const { products, people } = require('./data')


app.get('/', (req,res) =>{
  res.send('<h1>welcom wrld</h1><a href="/api/products">prod</a>')
})

app.get('/api/products', (req,res) =>{
  const newProds = products.map((product) =>{
    const {id,name,image} = product
    return  {id,name,image}
  })
  res.json(newProds)
})


app.get('/api/products/:id', (req,res) =>{
  // Classique
  // const singleProd = products.find((product)=>{
  //   return product.id === parseInt(req.params.id)
  // })

  // one liner
  // const singleProd = products.find(product => product.id === parseInt(req.params.id))

  // destructur
  const singleProd = products.find(({id}) => id === parseInt(req.params.id))
  
  if(!singleProd) return res.status(404).json({error: `prod ${req.params.id} not found`})
  res.json(singleProd)
})


app.all('*',(req,res)=>{
  res.status(404).send('not found')
})
app.listen(5000,()=> {
  console.log('server listening')
})