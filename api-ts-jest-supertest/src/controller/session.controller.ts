import { createSession } from '../service/session.service'
import { Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import {validatePassword} from '../service/user.service'


export async function createUserSessionHandler(req: Request, res:Response){
  // Validate user password
  const user = await validatePassword(req.body)

  if(!user) return res.status(StatusCodes.UNAUTHORIZED).send({message:'Ivalid email or password'})
  // creaste session 
  // create access token 
  // create refresh token
  // return access & refresh token
  try {
    const userId = ''
    const userAgent = ''
    const session = await createSession(userId, userAgent)
  } catch (error:any) {
    return  res.status(StatusCodes.CONFLICT).send(error.message) 
  }
}