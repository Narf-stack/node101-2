import jwt from "jsonwebtoken"
import config from 'config'
import log from './logger'

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
    const decoded = jwt.verify(token,jwtPublic,{'algorithms':['RS256']})

    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error:any) {
    if (error instanceof jwt.TokenExpiredError) {
      // Handle expired token
    } else if (error instanceof jwt.JsonWebTokenError) {
        // Handle other JWT-related errors
        log.error(`JWT Verification Error: ${error['message']}`);
        log.error(`JWT Token: ${token}`);
    } else {
        // Handle other errors
        log.error(`Unexpected Error: ${error}`);
    }

    return {
        valid: false,
        expired: error.message === 'jwt expired',
        decoded: null
    };
    
  }
}