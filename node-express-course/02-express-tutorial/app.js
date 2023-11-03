const http = require('http')
const { writeHeapSnapshot } = require('v8')

const server = http.createServer((req,res)=>{
  const url = req.url
  // home page
  if(url=== '/') {
    res.writeHead(200, {"content-type": "text/html"})
    res.write('<h1> hello wlrd</h1>')
    res.end()
  }
  // about page
  else if(url === '/about'){
    res.writeHead(200, {"content-type": "text/html"})
    res.write('<h1> abouttte</h1>')
    res.end()
  }
  // 404
  else {
    res.writeHead(404, {"content-type": "text/html"})
    res.write('<h1> error</h1>')
    res.end()
  }
})

server.listen(5000)