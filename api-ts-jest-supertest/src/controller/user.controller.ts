import { Request, Response} from 'express'
import {StatusCodes} from 'http-status-codes'
import { omit } from 'lodash' // allow to take off value on a json obj, use it to not send password once user created
import { createUser}  from '../service/user.service'
import { CreateUserInput } from '../schema/user.schema'

export async function createUserHandler(req:Request<{},{},CreateUserInput['body']>, res:Response) {
  try {
    const user = await createUser(req.body)// call create user service 
    return res.status(StatusCodes.CREATED).send(user) // convert user into json object to take off the password via omit
  } catch (error: any) {
    return  res.status(StatusCodes.CONFLICT).send(error.message) 
  }
}