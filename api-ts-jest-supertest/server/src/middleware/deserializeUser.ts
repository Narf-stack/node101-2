import {get} from 'lodash' // make safer to access a property that we dont know if it exist or not 
import { Request, Response, NextFunction} from 'express'
import { verifyJwt } from '../utils/jwt.utils'
import {reIssueAccessToken} from '../service/session.service'

const deserializeUser = async ( req:Request ,res: Response, next: NextFunction ) => {

  // get the accessToken and refreshToken from the headers or the cookies
  const accessToken = get(req, 'cookies.accessToken') || get(req,"headers.authorization",'').replace(/^Bearer\s/,'')
  const refreshToken = get(req, 'cookies.refreshToken') ||get(req,"headers.x-refresh")

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

      // set new access token in the cookie
      res.cookie("accessToken", newAccessToken, {
        maxAge: 900000, // 15 mins
        httpOnly : true, // this cookie can only be accessed by http and not JS, it's safer than using local storage
        domain:'localhost', // better use a var in config to have it moduable depending on the env ( prod, local,test...)
        path: "/",
        sameSite: "strict",
        secure: false // means that the cookie can only be used on "https", here false because locally we use "http" in production set to true, nicer to have a flag "isProduction? true :false " 
      })
    }

    // decode newAccesstoken and attached the decoded to user in the locals
    const result = verifyJwt(newAccessToken as string)

    res.locals.user = result.decoded 
    return next()

  }

  return next()
}

export default deserializeUser