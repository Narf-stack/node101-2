import {get} from 'lodash' // make safer to access a property that we dont know if it exist or not 
import { Request, Response, NextFunction} from 'express'
import { verifyJwt } from '../utils/jwt.utils'

const deserializeUser = ( req:Request ,res: Response, next: NextFunction ) => {

  const accessToken = get(req,"headers.authorization",'').replace(/^Bearer\s/,'')

  if(!accessToken) {
    return next()
  }
  const {decoded,expired} = verifyJwt(accessToken)
 
  if(decoded) { // will have a decoded if the token is valid 
    res.locals.user = decoded
    return next()
  }

  return next()
}

export default deserializeUser