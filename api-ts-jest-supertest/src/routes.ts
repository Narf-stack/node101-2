import { Express, Response, Request } from "express"
import {StatusCodes} from 'http-status-codes'
import { createUserHandler } from './controller/user.controller'
import validateResource from './middleware/validateResource'
import {createUserSchema} from './schema/user.schema'


function routes(app:Express) {
  app.get('/healthcheck', (req:Request,res:Response)=>{
    res.sendStatus(StatusCodes.OK)
  })
  app.post('/api/users', validateResource(createUserSchema), createUserHandler) // the req goes to middleware for validation before hitting the Usercreation
}

export default routes