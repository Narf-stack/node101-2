import express from 'express'
import deserializeUser from "../middleware/deserializeUser"
import routes from '../routes'
import cors from 'cors'
import config from 'config'


function createServer(){
  const app = express()

  app.use(cors({
    origin: config.get('origin'), // this is the server telling the browser we expect requests comin from this endpoint
    credentials: true // expecting header credential
  }))
  app.use(deserializeUser)
  app.use(express.json())
  routes(app)

  return app 
}
export default createServer