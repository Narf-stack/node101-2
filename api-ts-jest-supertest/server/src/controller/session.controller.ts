import { createSession, getSessions, updateSession } from '../service/session.service'
import { Request, Response} from 'express'
import { StatusCodes } from 'http-status-codes'
import {validatePassword} from '../service/user.service'
import { signJwt } from '../utils/jwt.utils'
import config from 'config'
import log from '../utils/logger'
import { Session } from 'inspector'

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
  const refreshTokenTtl = config.get<string>('refreshTokenTtl')
  const refreshToken = signJwt(
    { ...user, session: session._id},
    { expiresIn:refreshTokenTtl } // 15 min
  )

  // store access token , refreshToken in the cookies to sent them back to the server 
  res.cookie("accessToken", accessToken, {
    maxAge: 900000, // 15 mins
    httpOnly : true, // this cookie can only be accessed by http and not JS, it's safer than using local storage
    domain:'localhost', // better use a var in config to have it moduable depending on the env ( prod, local,test...)
    path: "/",
    sameSite: "strict",
    secure: false // means that the cookie can only be used on "https", here false because locally we use "http" in production set to true, nicer to have a flag "isProduction? true :false " 
  })

  res.cookie("refreshToken", refreshToken,{
    maxAge: 3.154e10, // 1 year
    httpOnly : true, // this cookie can only be accessed by http and not JS, it's safer than using local storage
    domain:'localhost', // better use a var in config to have it moduable depending on the env ( prod, local,test...)
    path: "/",
    sameSite: "strict",
    secure: false // means that the cookie can only be used on "https", here false because locally we use "http" in production set to true, nicer to have a flag "isProduction? true :false " 
  })

  // return access & refresh token
  return  res.status(StatusCodes.OK).send({accessToken, refreshToken}) 
  
}


export async function getUserSessionHandler(req:Request, res:Response){
  // user will added to the req object by deserializeUser middleware 
  const userId = res.locals.user._id

  const sessions = await getSessions({user:userId, valid:true})
  return res.status(StatusCodes.OK).send(sessions)
}


export async function deleteUserSessionHandler( req:Request, res: Response) {
  const session = res.locals.user.session

  await updateSession({_id:session}, {valid:false})
  return res.status(StatusCodes.OK).send({
    accessToken: null,
    refreshToken: null
  })
}