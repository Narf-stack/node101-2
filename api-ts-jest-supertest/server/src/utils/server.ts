import express, { Request, Response} from 'express'
import deserializeUser from "../middleware/deserializeUser"
import routes from '../routes'
import cors from 'cors'
import config from 'config'
import cookieParser from 'cookie-parser'  // library for parsing cookies
import responseTime from 'response-time'
import { restResponseTimeHistogram } from './metrics'


function createServer(){
  const app = express()

  app.use(cors({
    origin: config.get('origin'), // this is the server telling the browser we expect requests comin from this endpoint
    credentials: true // expecting header credential
  }))
  app.use(deserializeUser)

  // handle historgram performance metrics 
  app.use(responseTime((req:Request,res:Response,time:number)=>{
    if(req?.route?.path){
      restResponseTimeHistogram.observe({ // properties need to match the labelNames define in the restResponseTimeHistogram definiton in metrics.js
        method:req.method,
        route:req.route.path,
        status_code:res.statusCode
      }, time* 1000) // time in seconds
    }
  }))

  app.use(cookieParser()) // will help use to parse the cookies
  app.use(express.json())
  routes(app)

  return app 
}
export default createServer