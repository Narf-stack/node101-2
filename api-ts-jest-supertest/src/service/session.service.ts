import { FilterQuery, UpdateQuery } from 'mongoose'
import SessionModel, {sessionDocument} from '../models/session.model'
import { Session } from 'inspector'

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