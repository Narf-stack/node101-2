import { FilterQuery, UpdateQuery } from 'mongoose'
import SessionModel, {sessionDocument} from '../models/session.model'
import { Session } from 'inspector'
import { verifyJwt,signJwt } from '../utils/jwt.utils'
import { get } from 'lodash'
import { findUser } from './user.service'
import config from 'config'

export async function createSession(userId:string, userAgent:string){
  try {
    const session = await SessionModel.create({user: userId, userAgent})
    return session.toJSON()
  } catch (error:any) {
    throw new Error(error)
  }
}


export async function getSessions(query:FilterQuery<sessionDocument>){
  try {
    const sessions = await SessionModel.find(query).lean()
    return sessions
  } catch (error:any) {
    throw new Error(error)
  }
}



export async function updateSession(query:FilterQuery<sessionDocument>, update:UpdateQuery<sessionDocument>){
  
  return SessionModel.updateOne(query,update)
}


export async function reIssueAccessToken({refreshToken}:{refreshToken:string}){
  const {decoded} = verifyJwt(refreshToken)

  if(!decoded || !get(decoded, 'session')) return false
  
  const session = await SessionModel.findById(get(decoded, 'session'))

  if(!session || !session.valid) return false
  const user = await findUser({_id:session.user})

  if(!user) return false 

  // create access token 
  const accessTokenTtl = config.get<string>('accessTokenTtl')
  const accessToken = signJwt(
    { ...user, session: session._id},
    { expiresIn:accessTokenTtl } // 15 min
  )

    
  return accessToken
}