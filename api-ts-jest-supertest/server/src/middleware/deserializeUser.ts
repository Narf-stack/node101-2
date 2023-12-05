import {get} from 'lodash' // make safer to access a property that we dont know if it exist or not 
import { Request, Response, NextFunction} from 'express'
import { verifyJwt } from '../utils/jwt.utils'
import {reIssueAccessToken} from '../service/session.service'

const deserializeUser = async ( req:Request ,res: Response, next: NextFunction ) => {

  // get the accessToken and refreshToken from the headers
  const accessToken = get(req,"headers.authorization",'').replace(/^Bearer\s/,'')
  const refreshToken = get(req,"headers.x-refresh")

  // if not accessToken we return next
  if(!accessToken) {
    return next()
  }
  const {decoded,expired} = verifyJwt(accessToken)
 
  if(decoded) { // try to decoded the access token if there is one 
    //attach the decoded to the user and return next
    res.locals.user = decoded
    return next()
  }

  if( expired && refreshToken){ // if token expired but got a refreshToken
    
    if (typeof refreshToken !== 'string') return false

    // check validity of the refreshToken and issue a new access token
    const newAccessToken = await reIssueAccessToken({refreshToken})

    
    if(newAccessToken){
      // set the  newAccessToken to the header 
      res.setHeader('x-access-token', newAccessToken)
    }

    // decode newAccesstoken and attached the decoded to user in the locals
    const result = verifyJwt(newAccessToken as string)

    res.locals.user = result.decoded 
    return next()

  }

  return next()
}

export default deserializeUser