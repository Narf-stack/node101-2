const http = require('http')

const server = http.createServer((req,res)=>{
  console.log('hit server')
  res.end('hello wlrd')
})

server.listen(5000)