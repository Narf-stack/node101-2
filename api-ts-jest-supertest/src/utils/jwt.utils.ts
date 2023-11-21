import jwt from "jsonwebtoken"
import config from 'config'

const jwtPublic = config.get<string>('jwtPublic') 
const jwtPrivate = config.get<string>('jwtPrivate') 

export function signJwt(object:Object, options?: jwt.SignOptions | undefined){

  return jwt.sign(
    object,
    jwtPrivate,
    {
      ...(options && options), 
      algorithm: 'RS256'
    }
  )
}


export function verifyJwt(token:string){
  try {
    const decoded = jwt.verify(token,jwtPublic)
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error:any) {
    return {
      valid:false,
      expired: error.message === 'jwt expired',
      decoded: null
    }
  }
}