import { Express, Response, Request } from "express"
import {StatusCodes} from 'http-status-codes'
import { createUserHandler, getCurrentUser } from './controller/user.controller'
import validateResource from './middleware/validateResource'
import {createUserSchema} from './schema/user.schema'
import {createSessionSchema, } from './schema/session.schema'
import {createUserSessionHandler, getUserSessionHandler, deleteUserSessionHandler} from './controller/session.controller'
import requireUser from "./middleware/requireUser"
import { createProductHandler, updateProductHandler, deleteProductHandler, getProductHandler} from './controller/product.controller'
import {updateProductSchema,getProductSchema,deleteProductSchema,createProductSchema } from './schema/product.schema'


function routes(app:Express) {
  app.get('/healthcheck', (req:Request,res:Response)=>{
    res.sendStatus(StatusCodes.OK)
  })
  app.post('/api/users', validateResource(createUserSchema), createUserHandler) // the req goes to middleware for validation before hitting the Usercreation
  app.get('/api/me', requireUser, getCurrentUser) // the req goes to middleware for validation before hitting the Usercreation
  
  app.post('/api/sessions',  validateResource(createSessionSchema), createUserSessionHandler)
  app.get('/api/sessions', requireUser, getUserSessionHandler)
  app.delete('/api/sessions', requireUser, deleteUserSessionHandler)
  
  
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );
  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );
  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );
  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
}

export default routes