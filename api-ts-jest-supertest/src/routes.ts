import { Express, Response, Request } from "express"
import {StatusCodes} from 'http-status-codes'
import { createUserHandler } from './controller/user.controller'
import validateResource from './middleware/validateResource'
import {createUserSchema} from './schema/user.schema'
import {createSessionSchema, } from './schema/session.schema'
import {createUserSessionHandler, getUserSessionHandler, deleteUserSessionHandler} from './controller/session.controller'
import requireUser from "./middleware/requireUser"

function routes(app:Express) {
  app.get('/healthcheck', (req:Request,res:Response)=>{
    res.sendStatus(StatusCodes.OK)
  })
  app.post('/api/users', validateResource(createUserSchema), createUserHandler) // the req goes to middleware for validation before hitting the Usercreation
  app.post('/api/sessions',  validateResource(createSessionSchema), createUserSessionHandler)
  app.get('/api/sessions', requireUser, getUserSessionHandler)
  app.delete('/api/sessions', requireUser, deleteUserSessionHandler)
}

export default routes