import { createSession } from '../service/session.service'
import { Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import {validatePassword} from '../service/user.service'
import { signJwt } from '../utils/jwt.utils'
import config from 'config'

export async function createUserSessionHandler(req: Request, res:Response){
  // Validate user password
  const user = await validatePassword(req.body)

  if(!user) return res.status(StatusCodes.UNAUTHORIZED).send({message:'Ivalid email or password'})
  // creaste session 
  const session = await createSession(user._id,req.get("user-agent") || '' )
  // create access token 
  const accessTokenTtl = config.get<string>('accessTokenTtl')
  const accessToken = signJwt(
    { ...user, session: session._id},
    { expiresIn:accessTokenTtl } // 15 min
  )
  // create refresh token
  // return access & refresh token
  
  //  return  res.status(StatusCodes.CONFLICT).send(error.message) 
  
}