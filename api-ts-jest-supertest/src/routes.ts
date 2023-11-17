import { Express, Response, Request } from "express"
import {StatusCodes} from 'http-status-codes'

function routes(app:Express) {
  app.get('/healthcheck', (req:Request,res:Response)=>{
    res.sendStatus(StatusCodes.OK)
  })
}

export default routes