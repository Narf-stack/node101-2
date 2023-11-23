import { FilterQuery } from 'mongoose'
import SessionModel, {sessionDocument} from '../models/session.model'

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