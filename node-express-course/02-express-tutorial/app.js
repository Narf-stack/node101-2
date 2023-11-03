const http = require('http')
const { writeHeapSnapshot } = require('v8')

const server = http.createServer((req,res)=>{
  res.writeHead(200, {"content-type": "text/html"})
  res.write('<h1> hello wlrd</h1>')
  res.end()
})

server.listen(5000)