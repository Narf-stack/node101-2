import express from 'express'
import config from 'config'


// set app 
const app = express()
// fetch default parameters from the configuration files 
const port = config.get<number>('port')


// start server
app.listen(port,()=> {
  console.log('server listening')
})